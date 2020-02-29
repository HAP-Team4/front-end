import React from 'react';
import "./Main.css";
import { ListOfMovies } from './ListOfMovies';
import MovieForm from './components/MovieForm';
import LoginForm from './components/LoginForm';

import { Genre } from './Genre';
import Modal from 'react-modal';

export class Main extends React.Component {
	constructor () {
		super();
		this.state = {
			loginFormOpen: false,
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
				attendee: "0 1 2 3 4 5 6 7",
				date: "2020-01-01T00:00:00Z",
				genre: "Horror",
				location: "Some Cinema, London"
			},
			{
				title: "Hello!",
				attendee: "0 1 2 3",
				date: "2020-01-02T00:00:00Z",
				genre: "Comedy",
				location: "Cinema 2, London"
			},
			{
				title: "world!",
				attendee: "0 1 2 3 4 5 6",
				date: "2020-01-03T00:00:00Z",
				genre: "Romance",
				location: "University College London, London"
			},
		]);
	}

	got_movies(movies) {
		this.state.all_movies = movies.map(x => Object.assign(x, {
			attendee: x.attendee.split(" "),
			date: new Date(x.date)
		}));
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
	toggleOpenMovieForm = () => {
		this.setState({
			movieFormOpen: !this.state.movieFormOpen
		})
	}
	toggleOpenLoginForm = () => {
		this.setState({
			loginFormOpen: !this.state.loginFormOpen
		})
	}
	closeModal = () => {
		this.setState({
			movieFormOpen: false
		})
	}
	closeLoginModal = () => {
		this.setState({
			loginFormOpen: false
		})
	}

	render () {
		return (<div className="main">
			<div className="topbar">
				{this.maybeRenderBackButton()}
				<div className="appname">MovieApp</div>
				<div className="button" onClick={this.toggleOpenLoginForm}>Login</div>
				<Modal isOpen={this.state.loginFormOpen} onRequestClose={this.closeLoginModal}>
					<LoginForm closeModal={this.closeLoginModal}/>
				</Modal>
				<div className="button" onClick={this.toggleOpenMovieForm}>Create new movie</div>
				<Modal isOpen={this.state.movieFormOpen} onRequestClose={this.closeModal}>
					<MovieForm closeModal={this.closeModal}/>
				</Modal>
			</div>

			<div className="main-contain">
				{this.renderMovieList()}
			</div>
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
