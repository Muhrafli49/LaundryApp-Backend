require("dotenv").config();

const mongoose = require("mongoose");

async function connectionToDb() {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Connected to MongoDB");
    } catch {
        console.log("Failed to connect to MongoDB");
    }
}     

module.exports = connectionToDb;