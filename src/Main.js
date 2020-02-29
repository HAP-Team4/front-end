import React from 'react';
import "./Main.css";
import { ListOfMovies } from './ListOfMovies';
import MovieForm from './components/MovieForm';
import LoginForm from './components/LoginForm';
import SearchBar from './components/SearchBar';
import Modal from 'react-modal';
import MovieLists from './MovieLists';

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
			genres: [],
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
				<Modal isOpen={this.state.loginFormOpen} onRequestClose={this.closeLoginModal} style={{
					content: {
						top: "50%",
						left: "50%",
						width: "500px",
						bottom: "auto",
						marginRight: "-50%",
						transform: "translate(-50%,-50%)"
					}
				}}>
					<LoginForm closeModal={this.closeLoginModal}/>
				</Modal>
				&nbsp;
				<div className="button" onClick={this.toggleOpenMovieForm}>Create new movie</div>
				<Modal isOpen={this.state.movieFormOpen} onRequestClose={this.closeModal}  style={{
					content: {
						top: "50%",
						left: "50%",
						width: "500px",
						bottom: "auto",
						marginRight: "-50%",
						transform: "translate(-50%,-50%)"
					}
				}}>
					<MovieForm closeModal={this.closeModal}/>
				</Modal>
			</div>

			<div className="main-contain">
				<SearchBar />
				<MovieLists genres={this.state.genres} genre_filter={this.state.genre_filter} featured_movies={this.state.featured_movies} most_recent={this.state.most_recent}/>
			</div>
		</div>)
	}

	maybeRenderBackButton() {
		if (this.state.genre_filter !== null) {
			return (
				<div className="button back-btn" onClick={this.filterGenre.bind(this, null)}>Back</div>
			)
		}
		return null;
	}


}
