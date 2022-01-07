import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routers/Home";
import Login from "./routers/Login";
import Service from "./routers/Service";
import Regist from "./routers/Regist";
import ResultPage from "./routers/ResultPage";
import UserMain from "./routers/UserMain";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/regist" component={Regist} />
                <Route path="/service" component={Service} />
                <Route path="/result" component={ResultPage} />
                <Route path="/main" component={UserMain} />
            </Switch>
        </Router>
    );
}

export default App;
