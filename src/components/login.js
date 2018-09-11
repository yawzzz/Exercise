import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
axios.defaults.withCredentials = true;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      error: null,
      valerrors: null
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  submitHandler(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8080/login", this.state)
      .then(res => {
        if (res.data.error) {
          return this.setState({ error: res.data.message });
        }
        if (res.data.errors) {
          return this.setState({ valerrors: res.data.errors });
        }
        return (window.location = "/");
      });
  }

    render() {
            return (
                <div>
                 {this.state.error && <p>{this.state.error}</p>}
                    <div className="login">
                        <form onSubmit={this.submitHandler} className="form-login">
                        {this.state.valerrors &&
                        this.state.valerrors.email && (
                        <p>{this.state.valerrors.email.msg}</p>
                        )}
                            <div className="inputEmail">
                                <label className="sr-only" htmlFor="username"></label>
                                <input className="form-control"
                                id="email"
                                placeholder="Email"
                                value={this.state.username}
                                onChange={this.changeHandler}
                                type="email"
                                name="email"
                                />
                            </div>
                             {this.state.valerrors &&
                             this.state.valerrors.password && (
                             <p>{this.state.valerrors.password.msg}</p>
                             )}
                            <div className="inputPassword">
                                <label className="sr-only" htmlFor="password"></label>
                                <input className="form-control"
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.changeHandler}
                                id="password"
                                />
                            </div>
                            <button
                            id="loginButton"
                            className="btn btn-lg btn-success btn-block"
                            onClick={this.handleSubmit}
                            type="submit"><FontAwesomeIcon icon="unlock" /> Login</button>
                        </form>
                        <div className="registerLink">
                            <Link className="link" to="/register">{'Register'}</Link>
                            <Link className="forgotPassword" to="/register">Forgot Password?</Link>
                        </div>
                    </div>
                </div>
            );
        }
    }

export default Login;
