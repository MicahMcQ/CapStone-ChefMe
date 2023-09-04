import  Login from './login';
import Home from './pages/Home';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import { Switch} from "react-router-dom";
import './App.css';

function App() {
  return(
    <div className='App'>
    <Router>
    <main>
      <Switch>
        <Route exact path="/">
        <Home/>
        </Route>
      </Switch>
    </main>
    </Router>
    </div>
  )
}

export default App;
