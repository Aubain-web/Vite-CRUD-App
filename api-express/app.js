const express = require('express');
const app = express();
const Books = require('./books');
const cors=require("cors");
const corsOptions = {
   origin: '*',
   credentials: true, 
   optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoose = require('mongoose')

const host = process.env.HOSTDB || 'localhost';
const port = process.env.PORTDB || 27017;
console.log(host, port);
mongoose.connect(`mongodb://${host}:${port}/nextu`)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.get('/list/books', (req, res) => {
    Books.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
}); // List

app.get('recherche/books/:id', (req, res) => {
    Books.find({ "_id": req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(400).json({ error }))
}) // Get

app.get('/search/books', (req, res) => {
    const { title } = req.query;
    const query = {
        title: { $regex: new RegExp(title, 'i') } 
    };
    
    Books.find(query)
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
});//Get new by name


app.post('/ajouter/books', (req, res) => {
    console.log(req.body);
    const book = new Books({
        ...req.body
    });
    console.log(book)
    book.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}); // add

app.put('/maj/books/:id', (req, res) => {
    Books.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
}); // update

app.delete('/sup/books/:id', (req, res) => {
    Books.deleteOne({ _id:  req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
}); // delete

module.exports = app;