import { useEffect, useState } from 'react';
import './App.css';

type TDeck = {
  title: string;
  _id: string;
}

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState('');

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    await fetch('http://localhost:5000/decks', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    });
    setTitle("");
  }

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch('http://localhost:5000/decks');
      const newDecks = await response.json();
      setDecks(newDecks);
    }
    fetchDecks();
  }, [])

  return (
    <div className="App">
      <div className='decks'>
        {
          decks.map((deck) => <li key={deck._id}>{deck.title}</li>)
        }
      </div>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input id="deck-title" type="text" 
          value={title}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            //TODO: save what they typed
            setTitle(e.target.value);
          }}
        
        />
        <button>Create Deck</button>
      </form>
    </div>
  )
}

export default App
