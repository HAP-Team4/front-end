import React from "react";
import "./MoviePage.css"
import { current_uid } from "./Main";

export class MoviePage extends React.Component {
	render() {
		let movie = this.props.movie;
		return (
			<div className="moviepage">
				<div className="cover" style={{backgroundImage: `url(https://cataas.com/cat/says/${encodeURIComponent(movie.title)})`}}>
					<div className="lg"></div>
				</div>
				<h2>{movie.title}</h2>
				<div className="info">
					{movie.attendee.length} going {movie.attendee.includes(current_uid) ? "including you" : ""}
				</div>
			</div>
		)
	}
}
