import React, { Component } from 'react';
import debounce from 'lodash/debounce'; 
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: '',
      loading: false
    }
  }
  setValue = (value) => {
    this.setState({
			searchField: value
    });
  }
	handleSearchChange = () => {
		debounce(this.setValue, 300, {trailing: true});
    this.props.updateMovies(this.props.data.filter(m => m.title.indexOf(this.state.searchField) >= 0));
  }
  
  render() {
    const { searchField, loading } = this.state;
    if (!loading) {
      return (
      <div>
        <input type="text" style={{color:"white"}} className="input" placeholder="Search..." value={searchField} onChange={
          this.handleSearchChange}/>
      </div>
      )
    } else {
      return (
        <div className="container movie-form" style={{textAlign: "center"}}>
          <input type="text" style={{color:"white"}} className="input" placeholder="Searching..." />
          <button className="button" disabled onClick={this.handleSearchSubmit}>Enter</button>
        </div>
      )
    }

  }
}

export default SearchBar;