const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
  title: { type: String, required: true },        // The title or identifier of the letter
  number: { type: String, required: true },       // The letter number (e.g., "Letter #123")
  date: { type: Date, required: true },           // The publication date of the letter
  content: { type: String, required: true },      // The content or description of the letter
}, { timestamp: true });

const Pages = mongoose.model('Page', PageSchema);

module.exports = Pages;