import React, {Component} from 'react';
import {ListOfMovies} from './ListOfMovies';
import {Genre} from './Genre';

class MovieLists extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
  if (this.props.genre_filter === null) {
    return [
      <h2>Featured</h2>,
      <ListOfMovies data={this.props.featured_movies} />,
      <h2>Genre</h2>,
      <div className="horizontal-list">
        {this.props.genres.map(x => <Genre name={x} onClick={this.filterGenre.bind(this, x)} />)}
      </div>,
      <h2>Most recent</h2>,
      <ListOfMovies data={this.props.most_recent} />,
    ]
  } else {
    return [
      <h2>{this.props.genre_filter} movies:</h2>,
      <ListOfMovies data={this.props.all_movies.filter(x => x.genre === this.props.genre_filter)} />,
    ]
  }
  }
  filterGenre(name, evt) {
    this.setState({
      genre_filter: name
    })
  }
}

export default MovieLists;