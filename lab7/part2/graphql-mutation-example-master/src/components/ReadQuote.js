import React from 'react';

class ReadQuote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quoteList: []
        };
    }

    async componentDidMount() {
        const query = '{ quotes { id, quote } }';
        const res = await fetch('http://localhost:3002/graphql', {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
            body: JSON.stringify({query})
        });
        if (res.ok) {
            const body = await res.json();
            this.setState({ quoteList: body.data.quotes })
        } else {
            throw new Error(res.status);
        }
        this.setState({ id: this.state.quoteList[0].id })
    }

    render() {
        return <div>
                <h1>Read Quotes</h1>
                <ul>
                {
                    this.state.quoteList.map((item, index) => {
                        return <li key={index}>{item.quote}</li>
                    })
                }
                </ul>
            </div>
    }
}

export default ReadQuote;