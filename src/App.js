import React, { useState } from 'react';
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [nWord, setNWord] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [error, setError] = useState(null);

  async function handleClick() {
    try {
      let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${nWord}`);
      if (!response.ok) {
        throw new Error('Word not found');
      }
      let data = await response.json();
      let newWord = data[0].meanings[0].definitions[0].definition;
      let newAudioUrl = data[0].phonetics.length > 0 ? data[0].phonetics[0].audio : "";
      setWord(newWord);
      setAudioUrl(newAudioUrl);
    } catch (error) {
      setError(error.message);
    }
  }

  function handleChange(e) {
    setNWord(e.target.value);
  }

  return (
    <div className="container">
      <div className="dictionary-app">
        <h1>English Dictionary</h1>
        <input
          type="text"
          placeholder="Enter the word"
          onChange={handleChange}
          className="input"
        />
        <button onClick={handleClick} className="button">Search</button>
        {error && <p className="error">{error}</p>}
        {word && (
          <div className="result">
            <h2>{nWord}</h2>
            <p className="definition">{word}</p>
            {audioUrl && (
              <audio controls className="audio">
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
