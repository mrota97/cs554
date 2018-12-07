import React from 'react';
// import UserName from './UserName';

class UpdateTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Set a title here...',
            user: '1',
            isCompleted: true
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
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        return this.props.submitHandler(this.state)
    }

    render() {
        return <div className="update__todo">
            <h1>Update a Todo</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="update__todo__formgroup">
                    <label className="update__todo__label">Pick a user:</label>
                    <select name="user" value={this.state.user} onChange={this.handleChange} className="update__todo__assignee">
                        {this.populateOptions(this.props.users)}
                    </select>
                </div>
                <br />
                <div className="update__todo__formgroup">
                    <label>Which todo?</label>
                    <select name="todo" value={this.state.todo} onChange={this.handleChange} className="update__todo__todoselect">
                        {this.populateOptions(this.props.todos)}
                    </select>
                </div>
                <br />
                <div className="update__todo__formgroup">
                    <label className="update__todo__label">Description</label>
                    <textarea rows="5" cols="33" name="title" value={this.state.title} onChange={this.handleChange} className="update__todo__title" />
                </div>
                <br />
                <div className="update__todo__formgroup">
                    <label className="update__todo__label">Completed?</label>
                    <input name="isCompleted" type="checkbox" checked={this.state.isCompleted} onChange={this.handleChange} />
                </div>
                <div className="update__todo__formgroup">
                    <input type="submit" value="Submit" className="update__todo__submit" />
                </div>
            </form>
        </div>;
    }
}

export default UpdateTodo;  