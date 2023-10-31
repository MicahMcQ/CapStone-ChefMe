// SearchResults.js

import React from 'react';

function SearchResults({ results }) {
  return (
    <div>
      <h1>Search Results</h1>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
