import React from 'react';

class DeleteQuote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            quoteList: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const id = this.state.id;
        const query = `mutation { deleteQuote(input: {id:"${id}"}) {id quote} }`;
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
        this.setState({[event.target.name]: event.target.value});
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
                <form onSubmit={this.handleSubmit}>
                    <h1>Delete a quote</h1>
                    <select name="id" value={this.state.id} onChange={this.handleChange}>
                        {(() => {
                            return this.state.quoteList.map((option, index) => (
                                <option key={index} value={option.id}>{option.quote}</option>
                            ));
                        })()}
                    </select>
                    <input type="submit" value="Submit" />
                </form>
            </div>
    }
}

export default DeleteQuote;