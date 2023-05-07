import express from "express";
import mongoose from 'mongoose';
import Deck from './models/Deck';

const app = express();

const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send('located in / ')
})

app.post("/decks", async (req, res) => {
    
    const newDeck = new Deck({
        title: req.body.title
    });
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
})

mongoose.connect(
    "mongodb+srv://jaga991:tVZWhXJ8m0JBkV2t@cluster0.fkyroli.mongodb.net/?retryWrites=true&w=majority"
    ).then(() => {
        console.log(`listening on port ${PORT}`);
        app.listen(PORT);
    });


