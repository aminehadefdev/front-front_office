import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import './App.css';
import Profile from './components/Profile';
import SignIn from './components/SignIn'

function App() {
  return (
    <Router>
      <Route path="/" exact component={SignIn} />
      <Route path="/profile" exact component={Profile} />
    </Router>
  );
}

export default App;
