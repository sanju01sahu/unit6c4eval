const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGO_URL;

const connection = mongoose.connect(mongoURL);

module.exports = { connection };
