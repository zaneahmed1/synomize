import React, { useState } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("");

  return (
    <div className="App" >
      <header>
        <h1>Synomize</h1>
      </header>
      <main>
        <div className="synonym-fetcher">
          <label htmlFor="word-input">Enter Word:</label>
          <input
            id="word-input"
            type="text"
            placeholder="e.g., happy"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            aria-label="Input word to find synonyms"
          />
          <button disabled={!word.trim()}>
            {"Get Synonym"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
