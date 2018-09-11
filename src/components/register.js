import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_con: "",
      userdata: null,
      success: false
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
      .post("http://localhost:8080/register", this.state)
      .then(result => {
        if (result.data.errors) {
          return this.setState(result.data);
        }
        return this.setState({
          userdata: result.data,
          errors: null,
          success: true
        });
      });
  }


render() {
	return (
		<div>
			<div className="login">
			 {this.state.success && <p>You are successfully registerated!</p>}
				<form className="form-login">
					<div className="inputEmail">
						<label className="sr-only" htmlFor="username"></label>
						<input className="form-control"
							placeholder="Email"
							value={this.state.username}
							type="email"
            				name="email"
            				onChange={this.changeHandler}
            				id="emailreg"
						/>
						 {this.state.errors &&
            			this.state.errors.email && <p>{this.state.errors.email.msg}</p>}
					</div>
					<div className="inputPassword">
						<label className="sr-only" htmlFor="password"></label>
						<input className="form-control"
							placeholder="Password"
							value={this.state.password}
							type="password"
            				onChange={this.changeHandler}
            				name="password"
            				id="passwordreg"
						/>
						 {this.state.errors &&
            				this.state.errors.password && (
            				<p>{this.state.errors.password.msg}</p>
            				)}
						</div>
					<div className="inputPassword">
						<label htmlFor="inputPassword" className="sr-only"></label>
            			<input 
            			className="form-control" 
            			placeholder="Confirm Password" 
            			type="password"
            			onChange={this.changeHandler}
            			name="password_con"
            			id="password_con"
            			/>
            			 {this.state.errors &&
            			this.state.errors.password_con && (
            			<p>{this.state.errors.password_con.msg}</p>
            			)}
            		</div>
					
					<button
						id="registerButton"
						className="btn btn-lg btn-success btn-block"
						onClick={this.handleSubmit}
						type="submit"
					><FontAwesomeIcon icon="unlock" /> Register</button>
					<div className="registerLink">
	            		<Link  className="link" to="/">{'Login'}</Link>
	            		<Link className="forgotPassword" to="/">Forgot Password?</Link>
	        		</div>
				</form>
			</div>
		</div>

	)
}
}

export default Register;
