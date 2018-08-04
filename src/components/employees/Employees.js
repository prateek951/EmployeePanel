import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../Spinner";

class Employees extends Component {
  state = {
    totalOwed: null
  };

  static getDerivedStateFromProps(props, state) {
    const { employees } = props;
    if (employees) {
      //add balances to get the totalOwed
      const total = employees.reduce((total, emp) => {
        return total + parseFloat(emp.balance);
      }, 0);
      //Set the state
      return {
        totalOwed: total
      };
    } else {
      return null;
    }
  }
  render() {
    const { employees } = this.props;
    const { totalOwed } = this.state;
    if (employees) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                {" "}
                <i className="fa fa-users" /> Employees{" "}
              </h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Total Owed{" "}
                <span className="text-primary">
                  ${parseFloat(totalOwed).toFixed(2)}
                </span>
              </h5>
            </div>
            <table className="table table-striped">
              <thead className="thead-inverse">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Balance</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.id}>
                    <td>
                      {emp.firstName} {emp.lastName}
                    </td>
                    <td>{emp.email}</td>
                    <td>${parseFloat(emp.balance).toFixed(2)}</td>
                    <td>
                      <Link
                        to={`/employee/${emp.id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        <i className="fa fa-arrow-circle-right" />
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Employees.propTypes = {
  firestore: PropTypes.object.isRequired,
  employees: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "employees" }]),
  connect((state, props) => ({
    employees: state.firestore.ordered.employees
  }))
)(Employees);
