import React from 'react';
import CreateQuote from './components/CreateQuote';
import UpdateQuote from './components/UpdateQuote';
import ReadQuote from './components/ReadQuote';
import DeleteQuote from './components/DeleteQuote';
import { Route, Switch } from 'react-router-dom';

const App = () => {
    return <Switch>
        <Route exact path='/create' component={CreateQuote}/>
        <Route exact path='/update' component={UpdateQuote}/>
        <Route exact path='/read' component={ReadQuote}/>
        <Route exact path='/delete' component={DeleteQuote}/>
    </Switch>
};

export default App;
