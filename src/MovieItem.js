import React from "react";
import "./MovieItem.css";

export class MovieItem extends React.Component {
	render() {
		return (
			<div className="movie" style={{backgroundImage: `url(${this.props.imageUrl})`}}>
				<div className="buttom">
					<div className="name">{this.props.name}</div>
				</div>
			</div>
		)
	}
}
