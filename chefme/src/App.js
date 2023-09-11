import  Login from './pages/Login';
import Home from './pages/Home';
import {Route, BrowserRouter as Router, Link} from 'react-router-dom';
import './App.css';
import Signup from './pages/Signup';
import ContactUs from './pages/ContactUs';
import UserProf from './pages/UserProf';
import AboutUs from './pages/AboutUs';

function App() {
  return(
    <main className='App'>
    <Router>
      
      {/* home page with a login pop-up and some example content. */}
  <Route exact path="/">
    <Home />
  </Route>

      {/* login page */}
  <Route exact path="/login">
    <Login />
  </Route>

      {/* sign up page */}
  <Route exact path="/signup">
    <Signup />
  </Route>

      {/* contact us */}
  <Route exact path="/contact">
    <ContactUs />
  </Route>

      {/* profile page with favourite recipes and more */}
  <Route exact path="/user">
    <UserProf />
  </Route>

      {/* about us page */}
  <Route exact path="/about">
    <AboutUs />
  </Route>
    </Router>
    </main>
  )
}

export default App;
