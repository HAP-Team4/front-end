import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class MovieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      venues: 'Vue Picadilly',
      date: '',
    }
  }
  handleChange = (e) => {
    this.setState({value: e.target.value});
  }
  handleCalendarChange = (date) => {
    this.setState({ date })
  }
  handleSubmit = (e) => {
    // add post url
    alert('A name was submitted: ' + this.state.date);
    e.preventDefault();
  }
  render() {
    const { title, venues, date }  = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Movie Title
          <input type="text" value={title} onChange={this.handleChange}/>
        </label>
        <label>
          Venue
          <select>
            <option>
              {venues}
            </option>
          </select>
        </label>
        <label>
          Screening Date
          <div>
              <DatePicker
                selected={date}
                onChange={this.handleCalendarChange}
              />
          </div>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default MovieForm
