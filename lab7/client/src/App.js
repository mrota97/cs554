import React from 'react';
import './styles/style.css';
import UserListContainer from './containers/UserListContainer';
import TodoListContainer from './containers/TodoListContainer';
import CreateTodoContainer from './containers/CreateTodoContainer';
import { Route, Switch } from 'react-router-dom';

const App = () => {
    return <Switch>
        <Route exact path='/' component={UserListContainer}/>
        <Route path='/todos/:userId' component={TodoListContainer}/>
        <Route path='/create/todo' component={CreateTodoContainer}/>
    </Switch>
};

export default App;
