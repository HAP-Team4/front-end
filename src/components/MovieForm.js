import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MovieForm.css";

class MovieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      venues: 'Vue Picadilly',
      datetime: '',
    }
  }
  handleChange = (e) => {
    this.setState({title: e.target.value});
  }
  handleCalendarChange = (datetime) => {
    this.setState({ datetime })
  }
  handleSubmit = (e) => {
    // add post url
    alert('A name was submitted: ' + this.state.datetime);
    e.preventDefault();
  }
  render() {
    const { title, venues, datetime }  = this.state;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <button onClick={this.props.closeModal}>close</button>
          <div className="row">
            <label>
              Movie Title
              <input type="text" value={title} onChange={this.handleChange}/>
            </label>
          </div>
          <div className="row">
            <label>
              Venue
              <select>
                <option>
                  {venues}
                </option>
              </select>
            </label>
          </div>
          <div className="row">
          <label>
            Screening Date
            <div>
                <DatePicker
                  selected={datetime}
                  onChange={this.handleCalendarChange}
                  showTimeSelect
                  dateFormat="Pp"
                />
            </div>
          </label>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default MovieForm
