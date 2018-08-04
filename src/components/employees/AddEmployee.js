import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { disableBalanceOnAdd } from "../../actions/settingsAction";

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      balance: ""
    };
    this.bindEvents();
  }
  bindEvents() {
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDisableBalance = this.onDisableBalance.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onDisableBalance(e) {
    e.preventDefault();
    const { disableBalanceOnAdd} = this.props;
    disableBalanceOnAdd();
  }
  onSubmit(e) {
    e.preventDefault();
    console.log("inside the onSubmit call...");

    const empObject = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      balance: this.state.balance
    };

    //kya bande ne balance add kra hai ya nhi
    if (empObject.balance === "") {
      empObject.balance = 0;
    }

    const { firestore, history } = this.props;
    firestore
      .add({ collection: "employees" }, empObject)
      .then(() => history.push("/"));

    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      balance: ""
    });
  }

  render() {
    const { disableBalance } = this.props;
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
                  value={this.state.firstName}
                  onChange={this.onChange}
                  name="firstName"
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
                  value={this.state.lastName}
                  onChange={this.onChange}
                  name="lastName"
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
                  value={this.state.email}
                  onChange={this.onChange}
                  name="email"
                />
                {/* {this.state.email} */}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Contact</label>
                <input
                  type="text"
                  placeholder="Enter the contact number"
                  className="form-control form-control-lg"
                  value={this.state.phone}
                  onChange={this.onChange}
                  name="phone"
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
                  value={this.state.balance}
                  onChange={this.onChange}
                  name="balance"
                  disabled={!!disableBalance}
                />
                <span>Disable Balance</span>
                <input type="checkbox" checked={!!disableBalance} onChange={this.onDisableBalance} />
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
  }
}

AddEmployee.propTypes = {
  firestore: PropTypes.object.isRequired,
  disableBalance: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  disableBalance: state.settings.disableBalanceOnAdd
});

export default compose(
  firestoreConnect(),
  connect(
    mapStateToProps,
    { disableBalanceOnAdd }
  )
)(AddEmployee);
