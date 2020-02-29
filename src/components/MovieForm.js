import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
      <form onSubmit={this.handleSubmit}>
        <button onClick={this.props.closeModal}>close</button>
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
                selected={datetime}
                onChange={this.handleCalendarChange}
                showTimeSelect
                dateFormat="Pp"
              />
          </div>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default MovieForm
