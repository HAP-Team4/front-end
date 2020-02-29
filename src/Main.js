import React from 'react';
import "./Main.css";
import { ListOfMovies } from './ListOfMovies';
import MovieForm from './components/MovieForm';
import LoginForm from './components/LoginForm';
import SearchBar from './components/SearchBar';
import Modal from 'react-modal';
import MovieLists from './MovieLists';

export const server_base = "http://localhost:8080"
export let current_uid = null
export let set_movie_as_going;
export let login;
export let create_movie;

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

		this.request_all_movies();

		set_movie_as_going = async (movie_id) => {
			await fetch(`${server_base}/going?movie_id=${encodeURIComponent(movie_id.toString())}&user_id=${encodeURIComponent(current_uid)}`, {method: "PUT"})
			this.request_all_movies()
		}

		login = async (user_name, password) => {
			let h = new Headers();
			h.set("Content-Type", "application/json")
			let res = await fetch(`${server_base}/login`, { method: "POST", headers: h, body: JSON.stringify({user_id: user_name, password}) })
			if (res.status === 200) {
				current_uid = await res.text()
				this.forceUpdate()
				return
			} else {
				throw new Error(await res.text())
			}
		}

		create_movie = async (movie) => {
			let h = new Headers();
			h.set("Content-Type", "application/json")
			await fetch(`${server_base}/create_movie`, {method: "POST", headers: h, body: JSON.stringify(movie)})
			this.request_all_movies()
		}
	}

	async request_all_movies() {
		let json = await (await fetch(`${server_base}/all_movies`)).json();
		this.got_movies(json);
	}

	got_movies(movies) {
		this.state.all_movies = movies.map(x => Object.assign(x, {
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
		this.request_all_movies()
	}
	closeLoginModal = () => {
		this.setState({
			loginFormOpen: false
		})
		this.request_all_movies()
	}

	render () {
		return (<div className="main">
			<div className="topbar">
				{this.maybeRenderBackButton()}
				<div className="appname">MovieApp</div>
				{current_uid === null ? (
					<div className="button" onClick={this.toggleOpenLoginForm}>Login</div>
				) : (
					`Logged in as ${current_uid}`
				)}
				&nbsp;
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
				{current_uid !== null ? (
					<div className="button" onClick={this.toggleOpenMovieForm}>Create new movie</div>
				) : null}
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
