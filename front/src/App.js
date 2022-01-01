import "./App.css";
import React from "react";
import Navbar from "./component/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routers/Home";
import Login from "./routers/Login";
import Service from "./routers/Service";
import Regist from "./routers/Regist";
import ResultPage from "./routers/ResultPage";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/regist" component={Regist} />
                <Route path="/service" component={Service} />
                <Route path="/result" component={ResultPage} />
            </Switch>
        </Router>
    );
}

export default App;
