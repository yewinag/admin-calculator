import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./containers/Home/Loadable";
import SignUp from "./containers/SingUp/Loadable";
import Login from "./containers/Login/Loadable";
import "regenerator-runtime/runtime.js"; // import global regenerator runtime for async

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"> 
          <Home />
        </Route>
        <Route exact path="/login"> 
          <Login />
        </Route>
        <Route exact path="/sign-up"> 
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
