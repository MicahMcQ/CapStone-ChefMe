import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function SearchBar({ setSearchResults }) {
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/search?q=${searchQuery}`);
      const searchResults = response.data;

      // Update the searchResults state in the App component
      setSearchResults(searchResults);

      // Navigate to the search results route
      history.push('/search-results');
    } catch (error) {
      console.error('Error:', error);
    }
  }


  return (
    <div className="Card">
      <div className="CardInner">
        <label>Search for your favorite food</label>
        <div className="container">
          <div className="Icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#657789" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="feather feather-search">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <div className="InputContainer">
            <input
              placeholder="It just can't be pizza..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
