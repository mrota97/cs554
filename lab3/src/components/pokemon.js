import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export class listPokemon extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemon: [],
            current_page: 1,
            items_per_page: 20
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({ current_page: Number(event.target.id) });
    }

    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/pokemon/')
            .then(response => response.json())
            .then(data => this.setState({ pokemon: data.results }));
    }

    render() {
        const { pokemon, current_page, items_per_page } = this.state;

        const last = current_page * items_per_page;
        const first = last - items_per_page;
        const list = pokemon.slice(first, last);

        const render_items = list.map((pokemon, index) => {
            return (<li key={index}>
                <Link to={"/pokemon/" + pokemon.url.split('/')[6]}>{pokemon.name}</Link>
            </li>)
        });

        const pages = [];
        for (var i = 1; i <= Math.ceil(pokemon.length / items_per_page); i++) {
            pages.push(i);
        }
        const render_pages = pages.map(num => {
            return (
                <li class="page" key={num} id={num} onClick={this.handleClick}>{num}</li>
            )
        })

        return (
            <div>
                <ul>
                    {render_items}
                </ul>
                <ul id="page-numbers">
                        {render_pages}
                </ul>
            </div>
        )
    }
}

export class singlePokemon extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }

        this.id = this.props.match.params.id;
    }

    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/pokemon/' + this.id + "/")
            .then(response => response.json())
            .then(data => this.setState({ data }))
    }

    render() {
        const data = this.state.data;
        if (this.id > 949)
        return (
            <h1>404 not found</h1>
        )
        if (this.state.data != null)
            return (
                <div>
                    <h1>Name: {data.name}</h1>
                    <p>id: {data.id}</p>
                    <p>height: {data.height}</p>
                    <p>base experience: {data.base_experience}</p>
                </div>
            )
        else
            return <p>Loading</p>
    }
}