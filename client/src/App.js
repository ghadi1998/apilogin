import React, { Component } from "react";
import './App.css';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/api/login" component={Login} exact />
            
            
            
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
