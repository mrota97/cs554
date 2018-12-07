import React from 'react';
import ApiService from '../ApiService';
import CreateTodo from '../components/CreateTodo';
import UpdateTodo from '../components/UpdateTodo';
import DeleteTodo from '../components/DeleteTodo';
// import default from '../components/TodoList';
// import * as uuid from 'uuid/v4';

class CreateTodoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            whichComponent: "create", 
        };
        this.retrieveUsers = this.retrieveUsers.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.onNavClick = this.onNavClick.bind(this);
    }

    // uuid();

    async retrieveUsers() {
        try {
            const users = await ApiService.getUsers()
            this.setState({users});
            // this.setState({users})
        } catch (e) {
            console.error(`An error ${e.message} occured while searching users`);            
        }
    }

    async submitHandler({title, user}) {
        try {
            var userId = Number.parseInt(user, 10);
            if (Number.isNaN(userId)) {
                throw "Error: something went wrong with the userId!"
            }
            const createdTodo = await ApiService.createTodo({userId, title});
        } catch (e) {
            console.log(e);
        }
    }

    async componentDidMount() {
        await this.retrieveUsers();
    }

    onNavClick(event) {
        const component = event.currentTarget.dataset.id;
        this.setState({ whichComponent: component });
    }

    render() {
        return <div className="todo">
            <nav className="menu">
                <ul className="menu__list">
                    <li className="menu__list__element" data-id="create" onClick={this.onNavClick}>Create Todo</li>
                    <li className="menu__list__element" data-id="update" onClick={this.onNavClick}>Update Todo</li>
                    <li className="menu__list__element" data-id="delete" onClick={this.onNavClick}>Delete Todo</li>
                </ul>
            </nav>
            {(() => {
                switch (this.state.whichComponent) {
                    case "create":
                        return <CreateTodo users={this.state.users} submitHandler={this.submitHandler} />;
                    case "update":
                        return <UpdateTodo users={this.state.users} submitHandler={this.submitHandler} />;
                    case "delete":
                        return <DeleteTodo users={this.state.users} submitHandler={this.submitHandler} />;
                    default:
                        return <p>Something went wrong!</p>;
                }
            })()}
        </div>;
    }
}

export default CreateTodoContainer; 