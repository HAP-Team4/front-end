import React from "react";
import "./MovieItem.css";

export class MovieItem extends React.Component {
	render() {
		return (
			<div className="movie" style={{backgroundImage: `url(https://cataas.com/cat/says/${encodeURIComponent(this.props.data.title)})`}}>
				<div className="buttom">
					<div className="name">{this.props.data.title}</div>
					<div className="watchNumber">{this.props.data.attendee.length} watching</div>
				</div>
			</div>
		)
	}
}
