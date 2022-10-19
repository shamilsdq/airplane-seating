import React from "react";
import {
    Route,
    Switch,
    BrowserRouter as Router,
    Redirect,
} from "react-router-dom";

import Home from "./components/Home";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() => <Home />} />
                <Route path="*" render={() => <Redirect to="/" />} />
            </Switch>
        </Router>
    );
};

export default App;
