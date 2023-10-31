import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Preferences from './components/Preferences/Preferences';
import useToken from './components/App/useToken';
import FindRecipe from './components/FindeRecipe/FindRecipe';
import NavBar from './components/Nav/NavBar';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/searchResults/sarchResults';


function App() {

  const { token, setToken } = useToken();
  const [searchResults, setSearchResults] = useState([]); // State to store search results

  if(!token) {
    return <Login setToken={setToken} />
  }
  
  return (
    <div className="wrapper">
      <h1 id='title'>ChefMe</h1>
      <NavBar />
      <hr></hr>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
          <Route path="/search">
            <SearchBar setSearchResults={setSearchResults} /> {/* Pass setSearchResults as a prop */}
            <FindRecipe />
          </Route>
          <Route path="/search-results">
            <SearchResults results={searchResults} /> {/* Pass searchResults as a prop */}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
