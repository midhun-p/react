
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

import Login from './components/LogIn';
import Home from './components/Home';
import Register from './components/Register';
import Header from './components/Header';
// import Footer from './components/Footer';
import Users from './components/Users';
import UserDetails from './components/UserDetails';
import Programs from './components/Programs';

function App(props) {
  return (
    <>
      <Router>
        <Header></Header>
        <div className="container">
        <Route exact path='/' component={Login} />
        <Route path='/login' component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/users" component={Users} />
        <Route path="/user-details/:id" component={UserDetails} />
        <Route path="/programs" component={Programs} />
        </div>
        {/* <Footer></Footer> */}
      </Router>
    </>
  );
}

export default App;
