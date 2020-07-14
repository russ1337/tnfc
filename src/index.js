import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Cms from './cms/App';
import Content from './cms/Content';
import News from './cms/News';
import Pages from './cms/Pages';
import SignUp from './cms/SignUp';
import Staff from './cms/Staff';
import cookie from 'react-cookies';

import * as serviceWorker from './serviceWorker';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/cms/staff">
                <Staff/>
            </Route>
            <Route path="/cms/news">
                <News/>
            </Route>
            <Route path="/cms/pages">
                <Pages/>
            </Route>
            <Route path="/cms/signup">
                <SignUp/>
            </Route>
            <Route exact path="/cms">
                    {cookie.load('session') ? <Content/> : <Cms/>}
            </Route>
            <Route path="/">
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            </Route>
        </Switch>
    </Router>,
    document.getElementById('root')
);


serviceWorker.unregister();
