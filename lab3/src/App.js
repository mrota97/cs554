import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

const App = () => {
  <Router>
    <div>
      <Header />

      <Route exact path="/" component={Home} />
      <Route path="/pokemon/page/" component={Pokemen} />
      <Route path="/pokemon/" component={Pokemon} />
      <Route path="/berries/page/" component={Berries} />
      <Route path="/berries/" component={Berry} />
      <Route path="/machines/page/" component={Machines} />
      <Route path="/machines/" component={Machine} />
    </div>
  </Router>
};

const Home = () => <h1>Home</h1>;

const Pokemon = ({ match }) =>
const Pokemen = ({ match }) =>

const Berry = ({ match }) =>
const Berries = ({ match }) =>

const Machine = ({ match }) =>
const Machines = ({ match }) =>

export default App;