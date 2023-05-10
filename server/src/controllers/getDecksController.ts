import { Request, Response } from 'express';
import Deck from '../models/Deck';


export async function getDecksController(req:Request, res:Response) {
    //TODO fetch all decks and send to users
    const decks = await Deck.find();
    res.json(decks);

}