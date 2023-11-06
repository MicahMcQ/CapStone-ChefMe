import React, { useState }from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { useHistory } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Preferences from './components/Preferences/Preferences';
import useToken from './components/App/useToken';
import FindRecipe from './components/FindeRecipe/FindRecipe';
import NavBar from './components/Nav/NavBar';
import SearchBar from './components/SearchBar/SearchBar';
import axios from 'axios';
import SearchResults from './components/searchResults/SearchResults';
import About from './components/About/About';
import MaintenanceBanner from './components/Maintenance/Banner';
function App() {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();

   // Function to handle the search and update searchResults state
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

  const { token, setToken } = useToken();

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
        <Route path="/about">
<About />
        </Route>
        <Route path="/preferences">
          <Preferences />
        </Route>
        <Route path="/search">
        <SearchBar onSearch={handleSearch} />
        </Route>
        <Route path='/all'>
          <FindRecipe />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
    <MaintenanceBanner />
    </div>
  );
}

export default App;
