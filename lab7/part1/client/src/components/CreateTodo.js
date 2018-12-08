import React from 'react';
// import UserName from './UserName';

class CreateTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Set a title here...',
            user: '1'
        };
        this.populateOptions = this.populateOptions.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    populateOptions(options) {
        return options.map((option, index) => (
            <option key={index} value={option.id}>{option.first_name+" "+option.last_name}</option>
        ));
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        return this.props.submitHandler(this.state)
    }

    render() {
        return <div className="create__todo">
            <h1>Create a Todo</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="create__todo__formgroup">
                    <label className="create__todo__label">Description</label>
                    <textarea rows="5" cols="33" name="title" value={this.state.title} onChange={this.handleChange} className="create__todo__title" />
                </div>
                <br />
                <div className="create__todo__formgroup">
                    <label className="create__todo__label">Pick a user:</label>
                    <select name="user" value={this.state.user} onChange={this.handleChange} className="create__todo__assignee">
                        {this.populateOptions(this.props.users)}
                    </select>
                </div>
                <br />
                <div className="create__todo__formgroup">
                    <input type="submit" value="Submit" className="create__todo__submit" />
                </div>
            </form>
        </div>;
    }
}

export default CreateTodo;  