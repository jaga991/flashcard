import { useEffect, useState } from 'react';
import './App.css';
import { Link, useParams } from 'react-router-dom';
import { deleteDeck } from './api/deleteDeck';
import { TDeck, getDecks } from './api/getDecks';
import { createDeck } from './api/createDeck';
import { createCard } from './api/createCard';
import { getDeck } from './api/getDeck';
import { deleteCard } from './api/deleteCard';

export default function Deck() {
    const [deck, setDeck] = useState<TDeck | undefined>()
    const [cards, setCards] = useState<string[]>([]);
    const [text, setText] = useState('');
    let {deckId} = useParams()
 
    async function handleCreateDeck(e: React.FormEvent) {
        e.preventDefault();
        const {cards: serverCards} = await createCard(deckId!, text);
        setCards(serverCards);
        setText("");
    }

    async function handleDeleteCard(index: number) {
        if (!deckId) return;
        const newDeck = await deleteCard(deckId, index);
        setCards(newDeck.cards);
    }

    async function handleReturnToDecks() {

    }

    useEffect(() => {
        
        async function fetchDeck() {
        if(!deckId) return;
        const newDeck = await getDeck(deckId);
        setDeck(newDeck)
        setCards(newDeck.cards);
        }
        fetchDeck();
    }, [deckId]);

    return (
        <div className="App">
            <Link to={`/`}>Return to Decks</Link>
            <div>
                <h1>{deck?.title}</h1>
            </div>
            <ul className='decks'>
                {
                cards.map((card, index) => 
                <li key={index}>
                    <button onClick={() => handleDeleteCard(index)}>X</button>
                    {card}
                </li>)
                }
            </ul>
        <form onSubmit={handleCreateDeck}>
            <label htmlFor="card-text">Card Text</label>
            <input id="card-text" type="text" 
            value={text}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                //TODO: save what they typed
                setText(e.target.value);
            }}
            
            />
            <button>Create Card</button>
        </form>
        </div>
    )
}