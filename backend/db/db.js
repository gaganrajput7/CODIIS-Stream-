
const mongoose = require("mongoose");

const db = process.env.DATABASE|| 'mongodb+srv://gaganrajput875:gaganrajput@cluster0.ntnneor.mongodb.net/codiis?retryWrites=true&w=majority'
const connection = mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
