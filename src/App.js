import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom'; // eslint-disable-next-line to the line before.
// components
import Register from './components/register';
import Login from './components/login';
import { library } from '@fortawesome/fontawesome-svg-core';
// eslint-disable-next-line
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlock } from '@fortawesome/free-solid-svg-icons';

library.add(faUnlock);

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="logo"><img alt="logo" src="/images/logo.png" /></div>
        <div className="content">Video Managment And Integrated Support System</div>
        {/* greet user if logged in: */}
        {this.state.loggedIn &&
          <p>Welcome come back, {this.state.username}!</p>
        }
        {/* Routes to different components */}
       
        <Route
          exact path="/"
          render={() =>
            <Login
              updateUser={this.updateUser}
            />}
        />
        <Route
          path="/register"
          render={() =>
            <Register/>}
        />

      </div>
    );
  }
}

export default App;
