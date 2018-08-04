/**
* @name {UncontrolledComponent} EditEmployee
* @desc {Description of Component} Edit Employee 
Component of the application to edit the employee details
It holds a form bound to the state for edit the employee details
fetch from firestore the details of the employee and publish the 
changes to the firestore database on updation.
*/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import { disableBalanceOnEdit } from "../../actions/settingsAction";

class EditEmployee extends Component {
  constructor(props) {
    super(props);
    this.bindEvents();
    this.firstName = React.createRef();
    this.lastName = React.createRef();
    this.email = React.createRef();
    this.balance = React.createRef();
    this.phone = React.createRef();
  }
  bindEvents() {
    this.onSubmit = this.onSubmit.bind(this);
    this.onDisableBalance = this.onDisableBalance.bind(this);
  }
  onDisableBalance() {
    const { disableBalanceOnEdit } = this.props;
    disableBalanceOnEdit(); 
  }
  onSubmit(e) {
    e.preventDefault();
    console.log("inside the onSubmit...");
    const { employee, firestore, history } = this.props;
    const empObject = {
      firstName: this.firstName.current.value,
      lastName: this.lastName.current.value,
      email: this.email.current.value,
      phone: this.phone.current.value,
      balance:
        this.balance.current.value === "" ? 0 : this.balance.current.value
    };
    //Reach out to firestore and update the employee
    firestore
      .update({ collection: "employees", doc: employee.id }, empObject)
      .then(() => history.push("/"));
  }

  render() {
    //get the employee from the firestore
    const { employee, firestore, disableBalance } = this.props;
    //check for client ( whether it exists or not )
    if (employee) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                Back to dashboard <i className="fa fa-arrow-circle-left" />
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Add Employee</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">Firstname</label>
                  <input
                    type="text"
                    placeholder="Enter the firstname"
                    className="form-control form-control-lg"
                    defaultValue={employee.firstName}
                    name="firstName"
                    ref={this.firstName}
                    minLength="2"
                    required
                  />
                  {/* {this.state.firstName} */}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Lastname</label>
                  <input
                    type="text"
                    placeholder="Enter the lastname"
                    className="form-control form-control-lg"
                    defaultValue={employee.lastName}
                    name="lastName"
                    ref={this.lastName}
                    minLength="2"
                    required
                  />
                  {/* {this.state.lastName} */}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    placeholder="Enter the email"
                    className="form-control form-control-lg"
                    defaultValue={employee.email}
                    name="email"
                    ref={this.email}
                  />
                  {/* {this.state.email} */}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Contact</label>
                  <input
                    type="text"
                    placeholder="Enter the contact number"
                    className="form-control form-control-lg"
                    defaultValue={employee.phone}
                    name="phone"
                    ref={this.phone}
                    minLength="10"
                    required
                  />
                  {/* {this.state.phone} */}
                </div>
                <div className="form-group">
                  <label htmlFor="balance">Balance</label>
                  <input
                    type="text"
                    placeholder="Enter the balance"
                    className="form-control form-control-lg"
                    defaultValue={employee.balance}
                    name="balance"
                    ref={this.balance}
                    disabled={!!disableBalance}
                  />
                  <span>Disable Balance</span>
                  <input type="checkbox" checked={!!disableBalance} onChange={this.onDisableBalance}/>
                  {/* {this.state.balance} */}
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      //if no employee return the spinner just to simulate to the user that the fetching of client is going on
      return <Spinner />;
    }
  }
}

const mapStateToProps = ({...state, firestore: { ordered } }, props) => ({
  employee: ordered.employee && ordered.employee[0],
  disableBalance: state.settings.disableBalanceOnEdit
});

export default compose(
  firestoreConnect(props => [
    { collection: "employees", storeAs: "employee", doc: props.match.params.id }
  ]),
  connect(
    mapStateToProps,
    { disableBalanceOnEdit }
  )
)(EditEmployee);
