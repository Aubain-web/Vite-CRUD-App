"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var app = express();

var Books = require('./books');

var cors = require("cors");

var corsOptions = {
  origin: '*',
  credentials: true,
  // enable set cookie
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

};
app.use(cors(corsOptions)); // Use this after the variable declaration

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

var mongoose = require('mongoose');

var host = process.env.HOSTDB || 'localhost';
var port = process.env.PORTDB || 27017;
console.log(host, port);
mongoose.connect("mongodb://".concat(host, ":").concat(port, "/nextu")).then(function () {
  return console.log('Connexion à MongoDB réussie !');
})["catch"](function () {
  return console.log('Connexion à MongoDB échouée !');
});
app.get('/', function (req, res) {
  res.status(200).send('Hello World!');
});
app.get('/list/books', function (req, res) {
  Books.find().then(function (books) {
    return res.status(200).json(books);
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
}); // List

app.get('recherche/books/:id', function (req, res) {
  Books.find({
    "_id": req.params.id
  }).then(function (book) {
    return res.status(200).json(book);
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
}); // Get

app.get('/search/books', function (req, res) {
  var title = req.query.title;
  var query = {
    title: {
      $regex: new RegExp(title, 'i')
    }
  };
  Books.find(query).then(function (books) {
    return res.status(200).json(books);
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
}); //Get book by name or author

app.post('/ajouter/books', function (req, res) {
  console.log(req.body);
  var book = new Books(_objectSpread({}, req.body));
  console.log(book);
  book.save().then(function () {
    return res.status(201).json({
      message: 'Objet enregistré !'
    });
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
}); // add

app.put('/maj/books/:id', function (req, res) {
  Books.updateOne({
    _id: req.params.id
  }, _objectSpread({}, req.body, {
    _id: req.params.id
  })).then(function () {
    return res.status(200).json({
      message: 'Objet modifié !'
    });
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
}); // update

app["delete"]('/sup/books/:id', function (req, res) {
  Books.deleteOne({
    _id: req.params.id
  }).then(function () {
    return res.status(200).json({
      message: 'Objet supprimé !'
    });
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
}); // delete

module.exports = app;