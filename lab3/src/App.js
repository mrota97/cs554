import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import { singlePokemon, listPokemon } from './components/pokemon';
import { singleBerry, listBerry } from './components/berries';
import { singleMachine, listMachine } from './components/machines';

const App = () => (
  <Router>
    <div>
      {/* <Header /> */}

      <Route exact path="/" component={Home} />
      <Route path="/pokemon/page/:page" exact component={listPokemon} />
      <Route path="/pokemon/:id" exact component={singlePokemon} />
      <Route path="/berries/page/:page" exact component={listBerry} />
      <Route path="/berries/:id" exact component={singleBerry} />
      <Route path="/machines/page/:page" exact component={listMachine} />
      <Route path="/machines/:id" exact component={singleMachine} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h1>Welcome to the React Pokedex!</h1>
    <p>Pokemon are...</p>
    <Link to="/pokemon/page/0">Link to Pokemen</Link>
    <p>Berries are...</p>
    <Link to="/berries/page/0">Link to Berries</Link>
    <p>Machines are...</p>
    <Link to="/machines/page/0">Link to Machines</Link>
  </div>
);

export default App;