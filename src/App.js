
import React, { useState, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  const [currentSynonym, setCurrentSynonym] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const synonymRef = useRef(null);
  const errorRef = useRef(null);

  const fetchSynonyms = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.datamuse.com/words?rel_syn=${word}`
      );
      const synonymData = response.data;

      if (synonymData.length > 0) {
        setSynonyms(synonymData.map((item) => item.word));
        setCurrentSynonym(synonymData[0].word);
        setError("");
        synonymRef.current?.focus();
      } else {
        setError("No synonyms found. Try another word!");
        setSynonyms([]);
        setCurrentSynonym("");
        errorRef.current?.focus();
      }
    } catch {
      setError("Error fetching synonyms. Please try again.");
      errorRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" aria-busy={loading} aria-live="polite">
      <header>
        <h1>Synomize</h1>
      </header>
      <main>
        <div className="synonym-fetcher">
          <label htmlFor="word-input">Enter Word:</label>
          <input
            id="word-input"
            type="text"
            placeholder=""
            value={word}
            onChange={(e) => setWord(e.target.value)}
            aria-label="Input word to find synonyms"
            disabled={loading}
          />
          <button onClick={fetchSynonyms} disabled={loading || !word.trim()}>
            {loading ? "Loading..." : "Get Synonym"}
          </button>
          <br />
        {synonyms[0]}
          {error && (
            <p ref={errorRef} className="error" role="alert">
              {error}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

