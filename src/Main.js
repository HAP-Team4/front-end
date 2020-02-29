import React from 'react';
import "./Main.css";
import { ListOfMovies } from './ListOfMovies';

export class Main extends React.Component {
	render () {
		return (<div className="main">
			<div className="topbar">
				<div className="appname">MovieApp</div>
				<div className="button">Add new proposal</div>
			</div>
			<h2>Featured</h2>
				<ListOfMovies />
			<h2>Genre</h2>
			<h2>Most recent</h2>
		</div>)
	}
}
