import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { listDecks } from "../utils/api";
import Deck from "../decks/Deck";

export default function Home({ deckList, setDeckList }) {
  useEffect(() => {
    async function getDecks() {
      const deckList = await listDecks();
      setDeckList(deckList);
    }
    getDecks();
  }, [setDeckList]);

  const listedDecks = deckList.map((deck) => (
    <Deck key={deck.id} deck={deck} />
  ));

  return (
    <main className="container mb-3">
      <Link to="decks/new">
        <button type="button" className="btn btn-secondary btn-lg m-1">
          <i className="fas fa-plus"></i> Create Deck
        </button>
      </Link>
      <section className="column">{listedDecks}</section>
    </main>
  );
}
