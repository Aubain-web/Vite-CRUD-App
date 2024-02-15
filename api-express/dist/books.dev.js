"use strict";

var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});
var Book = mongoose.model('Book', bookSchema);
module.exports = Book;