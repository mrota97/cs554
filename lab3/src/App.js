import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import axios from 'axios';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios';



const App = () => (
  <Router>
    <div>
      {/* <Header /> */}

      <Route exact path="/" component={Home} />
      <Route path="/pokemon/page/:page" exact component={Pokemen} />
      <Route path="/pokemon/:id" exact component={Pokemon} />
      <Route path="/berries/page/:page" exact component={Berries} />
      <Route path="/berries/:id" exact component={Berry} />
      <Route path="/machines/page/:page" exact component={Machines} />
      <Route path="/machines/:id" exact component={Machine} />
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

const Pokemon = ({ match }) => <h1>Pokemon {match.params.id}</h1>;
const Pokemen = ({ match }) => (
  <div>
    <Get url="https://pokeapi.co/api/v2/pokemon/" params={{}}>
      {(error, response, isLoading, onReload) => {
        if(error) {
          return (
          <div>
            Something went wrong! {error.message}
          </div>
          );
        }
        else if(isLoading) {
          return (<div>Loading...</div>);
        }
        else if (response !== null) {
          return (<div>{response.data.message}</div>);
        }
        return(<div>Pokemon Page {match.params.id}</div>)
      }}
    </Get>
  </div>
);

const Berry = ({ match }) => <h1>Berry {match.params.id}</h1>;
const Berries = ({ match }) => (
  <div>
    {/* <h1>Berry List: Page {match.params.page}</h1> */}
  </div>
);

const Machine = ({ match }) => <h1>Machine {match.params.id}</h1>;
const Machines = ({ match }) => (
  <div>
    <h1>Machine List: Page {match.params.page}</h1>
  </div>
);

export default App;