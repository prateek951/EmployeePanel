import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../Spinner";
import classnames from "classnames";

class EmployeeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBalanceUpdate: false,
      balanceUpdateAmount: ""
    };
    this.bindEvents();
  }
  bindEvents() {
    this.onChange = this.onChange.bind(this);
    this.balanceSubmit = this.balanceSubmit.bind(this);
    this.onDeleteEmployee = this.onDeleteEmployee.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  //on delete employee
  async onDeleteEmployee(){
    const { employee, firestore, history } = this.props;
    await firestore.delete({collection: 'employees',doc: employee.id});
    history.push('/');
}
  //on update the employeee
  balanceSubmit(e) {
    e.preventDefault();
    console.log(
      "inside the balanceSubmit method",
      this.state.balanceUpdateAmount
    );
    const { employee, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;
    const updatedEmployee = {
      balance: parseFloat(balanceUpdateAmount)
    };
    //update in firestore
    firestore.update(
      { collection: "employees", doc: employee.id },
      updatedEmployee
    );
  }
  render() {
    const { employee } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;

    let balanceForm = "";
    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <div className="input-group">
            <input
              type="text"
              e
              className="form-control"
              name="balanceUpdateAmount"
              placeholder="Add new balance"
              value={balanceUpdateAmount}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="Update"
                className="btn btn-outline btn-dark"
              />
            </div>
          </div>
        </form>
      );
    } else {
      balanceForm = null;
    }

    if (employee) {
      //return the details for the employee
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fa fa-arrow-circle-left">Back to Dashboard</i>
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link
                  to={`/employee/edit/${employee.id}`}
                  className="btn btn-primary"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={this.onDeleteEmployee}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <h3 className="card-header">
              {employee.firstName} {employee.lastName}
            </h3>
            <div className="card-bod">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Employee ID:{" "}
                    <span className="text-secondary">{employee.id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 class="pull-right">
                    Balance:{" "}
                    <span
                      className={classnames({
                        "text-danger": employee.balance > 0,
                        "text-success": employee.balance === 0
                      })}
                    >
                      ${parseFloat(employee.balance).toFixed(2)}
                    </span>{" "}
                    <small>
                      <a
                        onClick={() =>
                          this.setState({
                            showBalanceUpdate: !this.state.showBalanceUpdate
                          })
                        }
                      >
                        <i className="fa fa-pencil" />
                      </a>
                    </small>
                  </h3>
                  {balanceForm}
                </div>
              </div>
              <hr />
              <ul className="list-group">
                <li className="list-group-item">
                  Contact Email : {employee.email}
                </li>
                <li className="list-group-item">
                  Contact Number : {employee.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

EmployeeDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "employees", storeAs: "employee", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    employee: ordered.employee && ordered.employee[0]
  }))
)(EmployeeDetails);
