import { v4 as uuidv4 } from "uuid";
import { NotFoundError } from "../utils/customErrors.js";

let products = [
  { id: "1", name: "Laptop", description: "Powerful laptop", price: 1000, category: "Electronics", inStock: true },
  { id: "2", name: "Book", description: "Educational book", price: 20, category: "Education", inStock: true }
];

// GET all products + filtering + pagination
export const getAllProducts = (req, res, next) => {
  try {
    const { category, page = 1, limit = 5 } = req.query;
    let filtered = products;

    if (category) filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginated = filtered.slice(startIndex, endIndex);

    res.json({ total: filtered.length, page: parseInt(page), limit: parseInt(limit), products: paginated });
  } catch (err) {
    next(err);
  }
};

// GET product by ID
export const getProductById = (req, res, next) => {
  try {
    const product = products.find(p => p.id === req.params.id);
    if (!product) throw new NotFoundError("Product not found");
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// CREATE product
export const createProduct = (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    const newProduct = { id: uuidv4(), name, description, price, category, inStock };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

// UPDATE product
export const updateProduct = (req, res, next) => {
  try {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) throw new NotFoundError("Product not found");

    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } catch (err) {
    next(err);
  }
};

// DELETE product
export const deleteProduct = (req, res, next) => {
  try {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) throw new NotFoundError("Product not found");

    const deleted = products.splice(index, 1);
    res.json({ message: "Product deleted", product: deleted[0] });
  } catch (err) {
    next(err);
  }
};

// SEARCH products
export const searchProducts = (req, res, next) => {
  try {
    const { name } = req.query;
    const results = products.filter(p => p.name.toLowerCase().includes(name?.toLowerCase() || ""));
    res.json(results);
  } catch (err) {
    next(err);
  }
};

// GET stats
export const getStats = (req, res, next) => {
  try {
    const stats = products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    res.json(stats);
  } catch (err) {
    next(err);
  }
};
