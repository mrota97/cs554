import React from 'react';

class CreateQuote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const quote = this.state.quote;

        const query = `mutation { createQuote(input: { quote:"${quote}" }) { id quote } }`;
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
            console.log(body.data);
        } else {
            throw new Error(res.status);
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        return <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Create a quote</h1>
                    <textarea name="quote" value={this.state.quote} onChange={this.handleChange}/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
    }
}

export default CreateQuote;