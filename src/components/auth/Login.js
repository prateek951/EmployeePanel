import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { notifyUser } from "../../actions/notifyAction";
import Alert from "../Alert";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.bindEvents();
  }
  bindEvents() {
    this.onChange = this.onChange.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async doLogin(e) {
    e.preventDefault();
    console.log(`[Login] inside the doLogin `);
    //Pull out the email and password from the state
    const { firebase,notifyUser,history } = this.props;
    const { email, password } = this.state;
    try {
      //Make a post request to firebase and send the credentials to server
      await firebase.login({ email, password });
      history.push("/");
    } catch (error) {
      notifyUser("[Login] Invalid credentials","error");
    }
    //Upon successful validation by server, firebase will send a token
    //which we can store in our localStorage of the application
  }
  render() {
    const { email, password } = this.state;
    const { message, messageType } = this.props.notify;
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
            {message ? (<Alert message={message} 
            messageType={messageType}></Alert>) : ''}


              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fa fa-lock" />{" "}
                </span>
                Login
              </h1>
              <form onSubmit={this.doLogin}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    name="email"
                    onChange={this.onChange}
                    required
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    onChange={this.onChange}
                    required
                    value={password}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default compose( 
    firebaseConnect(),
    connect((state,props) => ({
        notify: state.notify
    }),{ notifyUser })
)(Login);
