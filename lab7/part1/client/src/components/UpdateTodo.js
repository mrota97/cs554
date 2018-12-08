import React from 'react';
import find from 'lodash/find';
import filter from 'lodash/filter';
// import UserName from './UserName';

class UpdateTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            user: this.props.users[0].id,
            id: "",
            completed: false
        };
        this.populateUsers = this.populateUsers.bind(this);
        this.populateTodos = this.populateTodos.bind(this);
        this.getTodosForUser = this.getTodosForUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    populateUsers(options) {
        return options.map((option, index) => (
            <option key={index} value={option.id}>{option.first_name+" "+option.last_name}</option>
        ));
    }

    populateTodos(options) {
        return options.map((option, index) => (
            <option key={index} value={option.id}>{option.title}</option>
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

    getTodosForUser(userId) {
        const currentUser = find(this.props.users, function(user) { return user.id == userId});
        return filter(this.props.todos, function(todo) { return todo.user.first_name == currentUser.first_name});
    }

    componentDidMount() {
        const id = 0;
        this.setState({id: id});
    }

    render() {
        return <div className="update__todo">
            <h1>Update a Todo</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="update__todo__formgroup">
                    <label className="update__todo__label">Pick a user:</label>
                    <select name="user" value={this.state.user} onChange={this.handleChange} className="update__todo__assignee">
                        {this.populateUsers(this.props.users)}
                    </select>
                </div>
                <br />
                <div className="update__todo__formgroup">
                    <label>Which todo?</label>
                    <select name="id" value={this.state.id} onChange={this.handleChange} className="update__todo__todoselect">
                        {this.populateTodos(this.getTodosForUser(this.state.user))}
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
                    <input name="completed" type="checkbox" checked={this.state.isCompleted} onChange={this.handleChange} />
                </div>
                <div className="update__todo__formgroup">
                    <input type="submit" value="Submit" className="update__todo__submit" />
                </div>
            </form>
        </div>;
    }
}

export default UpdateTodo;  