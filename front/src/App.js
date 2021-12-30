import "./App.css";
import React from "react";
import Navbar from "./component/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routers/Home";
import Login from "./routers/Login";
import Service from "./routers/Service";
import Regist from "./routers/Regist";

function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/regist" component={Regist} />
                <Route path="/service" component={Service} />
            </Switch>
        </Router>
    );
}

export default App;
