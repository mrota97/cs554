import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export class listBerry extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            berry: [],
            current_page: 1,
            items_per_page: 20
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({ current_page: Number(event.target.id) });
    }

    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/berry/')
            .then(response => response.json())
            .then(data => this.setState({ berry: data.results }));
    }

    render () {
        const { berry, current_page, items_per_page } = this.state;

        const last = current_page * items_per_page;
        const first = last - items_per_page;
        const list = berry.slice(first, last);

        const render_items = list.map(berry => {
            return (<li key={ berry.url }>
                <Link to={"/berries/" + berry.url.split("/")[6]}>{ "Berry" + berry.url.split("/")[6] }</Link>
            </li>)
        });

        const pages = [];
        for (var i = 1; i <= Math.ceil(berry.length / items_per_page); i++) {
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

export class singleBerry extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }

        this.id = this.props.match.params.id;
    }

    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/berry/' + this.id + "/")
            .then(response => response.json())
            .then(data => this.setState({ data }))
    }
    
    render () {
        const data = this.state.data;
        if (this.id > 64)
        return (
            <h1>404 not found</h1>
        )
        if (this.state.data != null)
            return (
                <div>
                    <h1>Berry: {data.name}</h1>
                    <p>Size: {data.size}</p>
                    <p>Smoothness: {data.smoothness}</p>
                    <p>Soil Dryness: {data.soil_dryness}</p>
                    <p>id: {data.id}</p>
                    <p>Natural Gift Power: {data.natural_gift_power}</p>
                    <p>Max Harvest: {data.max_harvest}</p>
                    <p>Growth Time: {data.growth_time}</p>
                </div>
            )
        else
            return <p>Loading</p>
    }
}