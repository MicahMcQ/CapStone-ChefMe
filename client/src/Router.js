import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUp from './SignUp';
import Home from './Home';
import Recipes from './Recipes.js';

const AppRouter = () => {
  return (
    <Router>
      
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/recipes" component={Recipes} />
      
    </Router>
  );
};

export default AppRouter;
