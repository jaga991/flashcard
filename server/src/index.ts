import express from "express";
import mongoose from 'mongoose';
import Deck from './models/Deck';
import {config} from "dotenv";
config();

const app = express();

const PORT = process.env.PORT;

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

mongoose.connect(process.env.MONGO_URL!).then(() => {
        console.log(`listening on port ${PORT}`);
        app.listen(PORT);
    });


