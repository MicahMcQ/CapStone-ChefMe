import React from 'react';

function SearchResults({ results }) {
  // Assuming results is an array of search results
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result.name}</li> // Adjust the property to match your actual result structure
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
