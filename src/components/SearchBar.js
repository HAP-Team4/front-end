import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: '',
      loading: false
    }
  }
  handleSearchSubmit = () => {
    this.setState({
      loading: true
    })
    alert("Search: " + this.state.searchField)
	}
	handleSearchChange = (e) => {
		this.setState({
			searchField: e.target.value
		});
	}
  render() {
    const { searchField, loading } = this.state;
    if (!loading) {
      return (
      <div>
        <input type="text" style={{color:"white"}} className="input" placeholder="Search..." value={searchField} onChange={this.handleSearchChange}/>
        <button className="button" onClick={this.handleSearchSubmit}>Enter</button>
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