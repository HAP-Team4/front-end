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
      loading: false
    }
  }
  handleChange = (e) => {
    this.setState({ username: e.target.value });
  }
  handlePassword = (e) => {
    this.setState({ password: e.target.value })
  }
  handleSubmit = (e) => {
    this.setState({
      loading: true
    })
  }
  render() {
    const { username }  = this.state;
    if (this.state.loading) {
      return (
        <div className="container form-model" style={{textAlign: "center"}}>
          Loading
        </div>
      )
    }
    return (
      <div className="container form-model">
        <form>
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
          <div className="submit-contain">
            <div className="button" onClick={this.handleSubmit}>submit</div>
            <div className="button" onClick={this.props.closeModal}>cancel</div>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
