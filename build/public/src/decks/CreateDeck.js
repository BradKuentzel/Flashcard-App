import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api/index";

export default function CreateDeck({ deckList, createDeckHandler }) {
  const history = useHistory();

  const initialState = {
    name: "",
    description: "",
  };

  let lastDeck = deckList[deckList.length - 1];

  const [formData, setFormData] = useState({ ...initialState });
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await createDeck(formData);
    createDeckHandler(response);
    history.push(`/decks/${lastDeck.id + 1}`);
    history.go(0);
  };

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1> Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label> <br />
        <input
          className="form-control"
          id="name"
          type="text"
          name="name"
          placeholder="Deck Name"
          onChange={handleChange}
          value={formData.name}
        />{" "}
        <br />
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          className="form-control"
          id="description"
          type="text"
          name="description"
          placeholder="Brief description of the deck"
          onChange={handleChange}
          value={formData.description}
        />{" "}
        <br />
        <div className="buttons mb-3">
          <button type="submit" className="btn btn-primary mr-2">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.push("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
