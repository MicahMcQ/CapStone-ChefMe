// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

// import axios from 'axios';

// function SearchBar({ onSearch }) {
//   const [searchQuery, setSearchQuery] = useState('');
//   const history = useHistory();
//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`http://localhost:9000/search?q=${searchQuery}`);
//       // Handle the search results or update the state as needed

//       // Call the onSearch function to indicate that a search has been performed
//       onSearch();
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }

//   const navigate = () => {
//     history.push('/searchresults');
//     window.location.reload();
//   }

//   return (
//     <div className="Card">
//       <div className="CardInner">
//         <label>Search for your favorite food</label>
//         <div className="container">
//           <div className="Icon">
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#657789" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="feather feather-search">
//               <circle cx="11" cy="11" r="8"/>
//               <line x1="21" y1="21" x2="16.65" y2="16.65"/>
//             </svg>
//           </div>
//           <div className="InputContainer">
//             <input
//               placeholder="It just can't be pizza..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button onClick={handleSearch}>Search</button>
//             <br>
//           </br>
//           <br></br>
//           <button onClick={navigate}>Browse All Recipes</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SearchBar;
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/search?q=${searchQuery}`);
      setSearchResults(response.data);
      console.log(response.data);
      history.push('/searchresults');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const navigate = () => {
    history.push('/all');
    window.location.reload();
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
            <div>
  {searchResults.map((result, index) => (
    <div key={index} className="recipeThumbnail">
      <a href={result.source} target="_blank" rel="noopener noreferrer">
        <img src={result.image} alt={result.name} />
      </a>
      <p>{result.name}</p>
    </div>
  ))}
</div>
            <br />
            <button onClick={navigate}>Browse All Recipes</button>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
