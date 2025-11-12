import dotenv from "dotenv";
dotenv.config();

const auth = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: "Unauthorized. Invalid API Key." });
  }
  next();
};

export default auth;
