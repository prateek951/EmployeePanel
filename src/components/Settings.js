import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import {
  disableBalanceOnAdd,
  disableBalanceOnEdit,
  allowRegistration
} from "../actions/settingsAction";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.bindEvents();
  }
  bindEvents() {
    this.disableOnAdd = this.disableOnAdd.bind(this);
    this.disableOnEdit = this.disableOnEdit.bind(this);
    this.allowReg = this.allowReg.bind(this);
  }
  disableOnAdd(e) {
    e.preventDefault();
    const { disableBalanceOnAdd } = this.props;
    disableBalanceOnAdd();
  }
  disableOnEdit(e) {
    e.preventDefault();
    const { disableBalanceOnEdit } = this.props;
    disableBalanceOnEdit();
  }
  allowReg(e) {
    e.preventDefault();
    const { allowRegistration } = this.props;
    allowRegistration();
  }
  render() {
    const { settings } = this.props;
    return (
      <div className="container">
        <Link to="/" className="btn btn-link">
          <i className="fa fa-arrow-circle-left" /> Back to Dashboard
        </Link>
        <div className="card">
          <h1 className="alert alert-success card-header">
            Click on respective buttons to do following settings
          </h1>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="allowRegistration">Allow Registration</label>
                <button
                  className={classnames("btn", {
                    "btn-danger": settings.allowRegistration,
                    "btn-success": !settings.allowRegistration
                  })}
                  name="allowRegistration"
                  onClick={this.allowReg}
                >
                  {settings.allowRegistration
                    ? "Unregister"
                    : "Register"}
                </button>
              </div>
              <div className="form-group">
                <label htmlFor="disableBalanceOnAdd">
                  Disable balance in AddEmployee Form
                </label>
                <button
                  className={classnames("btn", {
                    "btn-danger": settings.disabledBalanceOnAdd,
                    "btn-success": !settings.disableBalanceOnAdd
                  })}
                  name="disableBalanceOnAdd"
                  onClick={this.disableOnAdd}
                >
                  {settings.disableBalanceOnAdd
                    ? "Balance Disabled"
                    : "Disable"}
                </button>
              </div>
              <div className="form-group">
                <label htmlFor="disableBalanceOnEdit">
                  Disable balance in EditEmployee Form
                </label>
                <button
                  className={classnames("btn", {
                    "btn-danger": settings.disabledBalanceOnEdit,
                    "btn-success": !settings.disableBalanceOnEdit
                  })}
                  name="disableBalanceOnEdit"
                  onClick={this.disableOnEdit}
                >
                  {settings.disableBalanceOnEdit
                    ? "Balance disabled"
                    : "Disable"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  disableBalanceOnAdd: PropTypes.func.isRequired,
  disableBalanceOnEdit: PropTypes.func.isRequired,
  allowRegistration: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  settings: state.settings
});

export default connect(
  mapStateToProps,
  { disableBalanceOnAdd, disableBalanceOnEdit, allowRegistration }
)(Settings);
