
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/LogIn';
import Home from './components/Home';
import Register from './components/Register';

function App() {
  return (
    <Router>
        <div>
          <Route exact path='/' component={Login} />
          <Route exact path='/login' component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/register" component={Register} />
        </div>
      </Router>
  );
}

export default App;
