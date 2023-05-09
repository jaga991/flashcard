import express from "express";
import mongoose from 'mongoose';
import Deck from './models/Deck';
import cors from 'cors';
import {config} from "dotenv";
config();

const app = express();

const PORT = process.env.PORT;


app.use(express.json());
app.use(cors())

app.get('/decks', async (req, res) => {
    //TODO fetch all decks and send to users
    const decks = await Deck.find();
    res.json(decks);
})

app.post("/decks", async (req, res) => {
    
    const newDeck = new Deck({
        title: req.body.title
    });
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
})

app.delete('/decks/:deckId', async (req, res) => {
    //TODO
    //get deck id from url
    //delete the deck from mongo
    //return the deleted deck to the user who made the request
    const deckId = req.params.deckId;
    const deck = await Deck.findByIdAndDelete(deckId);
    res.json(deck);
})

mongoose.connect(process.env.MONGO_URL!).then(() => {
        console.log(`listening on port ${PORT}`);
        app.listen(PORT);
    });


