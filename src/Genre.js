import React from "react";
import "./Genre.css";
export class Genre extends React.Component {
	render() {
		return (
			<div className="genre" onClick={this.props.onClick}>{this.props.name}</div>
		)
	}
}
