import React, {Component} from 'react';
import Calendar from 'react-calendar'
class MovieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      venues: 'Vue Picadilly',
      date: '',
      isCalendarOpen: false
    }
  }
  handleChange = (e) => {
    this.setState({value: e.target.value});
  }
  handleCalendarChange = (date) => {
    this.setState({ date })
  }
  toggleOpen = () => {
    this.setState({ 
      isCalendarOpen: !this.state.isCalendarOpen
    })
  }
  handleSubmit = (e) => {
    // add post url
    alert('A name was submitted: ' + this.state.date);
    e.preventDefault();
  }
  render() {
    const {title, venues, date, isCalendarOpen}  = this.state;
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
          <button onClick={this.toggleOpen}>
            {isCalendarOpen && <Calendar
              onChange={this.handleCalendarChange}
              value={date}
            />}
          </button>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default MovieForm
