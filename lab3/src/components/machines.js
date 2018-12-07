import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export class listMachine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            machine: [],
            current_page: 1,
            items_per_page: 20
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({ current_page: Number(event.target.id) });
    }

    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/machine/')
            .then(response => response.json())
            .then(data => this.setState({ machine: data.results }));
    }

    render () {
        const { machine, current_page, items_per_page } = this.state;

        const last = current_page * items_per_page;
        const first = last - items_per_page;
        const list = machine.slice(first, last);

        const render_items = list.map(machine => {
            return (<li key={ machine.url }>
                <Link to={"/machines/" + machine.url.split("/")[6]}>{ "Technical Machine" + machine.url.split("/")[6] }</Link>
            </li>)
        });

        const pages = [];
        for (var i = 1; i <= Math.ceil(machine.length / items_per_page); i++) {
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

export class singleMachine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }

        this.id = this.props.match.params.id;
    }

    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/machine/' + this.id + "/")
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }

    render () {
        const data = this.state.data;
        if (this.id > 1327)
            return (
                <h1>404 not found</h1>
            )
        if (this.state.data != null)
            return (
                <div>
                    <h1>{data.item.name}: {data.move.name}</h1>
                    <p>Version Group: {data.version_group.name}</p>
                </div>
            )
        else
            return <p>Loading...</p>
    }
}