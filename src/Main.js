import React from 'react';
import "./Main.css";
import { ListOfMovies } from './ListOfMovies';
import MovieForm from './components/MovieForm';
import { Genre } from './Genre';

export class Main extends React.Component {
	constructor () {
		super();
		this.state = {
			movieFormOpen: false,
			all_movies: [],
			featured_movies: [],
			most_recent: [],
			genre_filter: null,
			genres: []
		};
		this.got_movies([
			{
				title: "Hello world",
				attendee: [0,1,2,3,4,5,6],
				date: "2020-01-01T00:00:00Z",
				genre: "Horror"
			},
			{
				title: "Hello!",
				attendee: [0,1,2,3],
				date: "2020-01-02T00:00:00Z",
				genre: "Comedy"
			},
			{
				title: "world!",
				attendee: [0,1,2,3,4],
				date: "2020-01-03T00:00:00Z",
				genre: "Romance"
			},
		]);

		this.handleOpenMovieForm = this.handleOpenMovieForm.bind(this);
	}

	got_movies(movies) {
		this.state.all_movies = movies;
		this.state.featured_movies = this.state.all_movies.slice().sort((a, b) => Math.sign(b.attendee.length - a.attendee.length))
		this.state.most_recent = this.state.all_movies.slice().sort((a, b) => Math.sign(new Date(b.date) - new Date(a.date)));
		this.state.genres = this.state.all_movies.map(x => x.genre).reduce((xs, x) => {
			if (xs.includes(x)) {
				return xs;
			} else {
				xs.push(x);
				return xs;
			}
		}, [])
		this.forceUpdate()
	}

	render () {
		return (<div className="main">
			<div className="topbar">
				{this.maybeRenderBackButton()}
				<div className="appname">MovieApp</div>
				<div className="button" onClick={this.handleOpenMovieForm}>Add new proposal</div>
			</div>

			{this.renderMovieList()}

			<MovieForm />
		</div>)
	}

	renderMovieList() {
		if (this.state.genre_filter === null) {
			return [
				<h2>Featured</h2>,
				<ListOfMovies data={this.state.featured_movies} />,
				<h2>Genre</h2>,
				<div className="horizontal-list">
					{this.state.genres.map(x => <Genre name={x} onClick={this.filterGenre.bind(this, x)} />)}
				</div>,
				<h2>Most recent</h2>,
				<ListOfMovies data={this.state.most_recent} />,
			]
		} else {
			return [
				<h2>{this.state.genre_filter} movies:</h2>,
				<ListOfMovies data={this.state.all_movies.filter(x => x.genre === this.state.genre_filter)} />,
			]
		}
	}

	handleOpenMovieForm (evt) {
	}

	maybeRenderBackButton() {
		if (this.state.genre_filter !== null) {
			return (
				<div className="button back-btn" onClick={this.filterGenre.bind(this, null)}>Back</div>
			)
		}
		return null;
	}

	filterGenre(name, evt) {
		this.setState({
			genre_filter: name
		})
	}
}
