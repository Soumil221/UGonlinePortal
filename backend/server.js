const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

// Initialize Express app
const app = express()

// Load environment variables
dotenv.config()

// Middleware to parse JSON
app.use(express.json())

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Institute Backend API")
})

// Get port from environment variables or default to 5000
const PORT = process.env.PORT || 5000

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
})
