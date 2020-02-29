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
      <div className="container movie-form">
        <form onSubmit={this.handleSubmit}>
          <div className="button" onClick={this.props.closeModal}>close</div>
          <div className="row">
            <label>
              Movie Title:
              <br></br>
              <input type="text" value={title} onChange={this.handleChange}/>
            </label>
          </div>
          <div className="row">
            <label>
              Venue:&nbsp;
              <br></br>
              <select>
                <option>
                  {venues}
                </option>
              </select>
            </label>
          </div>
          <div className="row">
          <label>
            Screening Date:
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
          <div className="submit-contain">
            <div className="button">submit</div>
          </div>
        </form>
      </div>
    )
  }
}

export default MovieForm
