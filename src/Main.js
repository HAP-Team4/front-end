import React from 'react';
import "./Main.css";
import { ListOfMovies } from './ListOfMovies';

export class Main extends React.Component {
	constructor () {
		super();
		this.state = {
			movieFormOpen: false,
			featured_movies: [],
			most_recent: [],
		};
		this.state.featured_movies = [
			{
				title: "Hello world",
				attendee: [0,1,2,3,4,5,6],
				date: "2020-01-01T00:00:00Z"
			},
			{
				title: "Hello!",
				attendee: [0,1,2,3],
				date: "2020-01-02T00:00:00Z"
			},
			{
				title: "world!",
				attendee: [0,1,2,3,4],
				date: "2020-01-03T00:00:00Z"
			},
		];
		this.state.most_recent = this.state.featured_movies.slice().sort((a, b) => Math.sign(new Date(b.date) - new Date(a.date)));

		this.handleOpenMovieForm = this.handleOpenMovieForm.bind(this);
	}
	render () {
		return (<div className="main">
			<div className="topbar">
				<div className="appname">MovieApp</div>
				<div className="button" onClick={this.handleOpenMovieForm}>Add new proposal</div>
			</div>
			<h2>Featured</h2>
			<ListOfMovies data={this.state.featured_movies} />
			<h2>Genre</h2>
			<h2>Most recent</h2>
			<ListOfMovies data={this.state.most_recent} />
		</div>)
	}

	handleOpenMovieForm (evt) {
	}
}
