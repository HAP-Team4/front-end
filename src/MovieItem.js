import React from "react";
import "./MovieItem.css";

export class MovieItem extends React.Component {
	render() {
		return (
			<div className="movie" style={{backgroundImage: `url(https://cataas.com/cat/says/${encodeURIComponent(this.props.data.title)})`}}>
				<div className="buttom">
					<div className="name">{this.props.data.title}</div>
					<div className="watchNumber">{this.props.data.attendee.length} going</div>
				</div>
				<div className="expansion">
					<div className="info">
						<div>{this.props.data.genre}</div>
						<div>Venue: &hellip;</div>
						<div>Date: &hellip;</div>
					</div>
					<div>
						<div className="button">Go!</div>
					</div>
				</div>
			</div>
		)
	}
}
