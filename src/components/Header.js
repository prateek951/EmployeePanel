import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

class Header extends React.Component {
  state = {
    isAuthenticated: false
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    //Pull out the auth from props
    const { auth } = nextProps;
    //Check for auth,if auth set isAuthenticated : true
    if (auth.uid) {
      return {
        isAuthenticated: true
      };
    } else {
      //else set to false
      return {
        isAuthenticated: false
      };
    }
  }

  doLogout = e => {
    e.preventDefault();
    const { firebase } = this.props;
    firebase.logout();
  };

  render() {
    const { auth } = this.props;
    const { isAuthenticated } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-success mb-4">
          <div className="container">
            <Link to="/" className="navbar-brand">
              Employee Panel
            </Link>
            <button
              className="navbar-toggler"
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarMain"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarMain">
              {isAuthenticated ? (
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/settings" className="nav-link">
                      Settings
                    </Link>
                  </li>
                </ul>
              ) : null}
              {isAuthenticated ? (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a href="#!" className="nav-link">
                      {auth.email}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#!" className="nav-link" onClick={this.doLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Header);
