import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Dashboard from "./components/Dashboard";
import { Provider } from "react-redux";
import store from "./store";
import AddEmployee from "./components/employees/AddEmployee";
import EmployeeDetails from "./components/employees/EmployeeDetails";
import EditEmployee from "./components/employees/EditEmployee";
import Login from "./components/auth/Login";
import Header from "./components/Header";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth";
import Settings from "./components/Settings";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/settings" component={UserIsAuthenticated(Settings)} />
                <Route
                  exact
                  path="/"
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path="/employee/add"
                  component={UserIsAuthenticated(AddEmployee)}
                />
                <Route
                  exact
                  path="/employee/:id"
                  component={UserIsAuthenticated(EmployeeDetails)}
                />
                <Route
                  exact
                  path="/employee/edit/:id"
                  component={UserIsAuthenticated(EditEmployee)}
                />
                <Route
                  exact
                  path="/auth/login"
                  component={UserIsNotAuthenticated(Login)}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
