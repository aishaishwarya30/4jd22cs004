// server.js
import express from "express";
import { nanoid } from "nanoid";

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// In-memory database
const urls = {};

// Route to shorten URL
app.post("/shorten", (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortId = nanoid(6); // random 6-character id
  urls[shortId] = originalUrl;

  res.json({ shortUrl: `http://localhost:${PORT}/${shortId}` });
});

// Redirect route
app.get("/:id", (req, res) => {
  const originalUrl = urls[req.params.id];
  if (originalUrl) {
    return res.redirect(originalUrl);
  }
  res.status(404).send("URL not found");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
