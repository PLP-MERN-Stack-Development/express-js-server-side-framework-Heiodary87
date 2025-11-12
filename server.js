import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import productRoutes from "./routes/productRoutes.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
app.use("/api/products", productRoutes);

// Hello World route
app.get("/", (req, res) => {
  res.send("Hello World from Express.js API!");
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
