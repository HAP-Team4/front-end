import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MovieForm.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }
  handleChange = (e) => {
    this.setState({ username: e.target.value });
  }
  handlePassword = (e) => {
    this.setState({ password: e.target.value })
  }
  handleSubmit = (e) => {
    // add post url
    alert('A name was submitted: ' + this.state.username + this.state.password);
    e.preventDefault();
  }
  render() {
    const { username }  = this.state;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
        <button onClick={this.props.closeModal}>close</button>
          <div className="row">
            <label>
              Username
              <input type="text" value={username} onChange={this.handleChange}/>
            </label>
          </div>
          <div className="row">
            <label>
              Password
              <input type="password" onChange={this.handlePassword}/>
            </label>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default LoginForm
