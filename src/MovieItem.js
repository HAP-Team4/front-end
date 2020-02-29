import React from "react";
import "./MovieItem.css";

import { current_uid, set_movie_as_going, open_movie } from "./Main";

export class MovieItem extends React.Component {
	render() {
		return (
			<div className="movie" onClick={() => open_movie(this.props.data.movie_id)} style={{backgroundImage: `url(https://cataas.com/cat/says/${encodeURIComponent(this.props.data.title)})`}}>
				<div className="buttom">
					<div className="name">{this.props.data.title}</div>
					<div className="watchNumber">{this.props.data.attendee.length} going</div>
				</div>
				<div className="expansion">
					<div className="info">
						<div>{this.props.data.genre}</div>
						<div>Venue: {this.props.data.location}</div>
						<div>Date: {this.props.data.date.toDateString()}</div>
					</div>
					<div>
						{current_uid !== null ? (this.props.data.attendee.includes(current_uid)) ? (
							<div>Going!</div>
						) : (
							<div className="button" onClick={this.handleGo.bind(this, this.props.data.movie_id)}>Go!</div>
						) : (
							<div>Login?</div>
						)}
					</div>
				</div>
			</div>
		)
	}

	handleGo(movie_id) {
		set_movie_as_going(movie_id)
	}
}
