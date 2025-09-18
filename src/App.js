import React, { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    if (!url) return alert("Please enter a URL");

    try {
      // Call backend API
      const response = await fetch("http://localhost:5000/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: url }),
      });

      const data = await response.json();
      if (data.shortUrl) {
        setShortUrl(data.shortUrl);
      } else {
        alert("Failed to shorten URL");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend");
    }
  };

  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <input
        type="text"
        placeholder="Enter your URL here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleShorten}>Shorten</button>

      {shortUrl && (
        <p>
          Shortened URL:{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}

export default App;
