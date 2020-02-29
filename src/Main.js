import React from 'react';
import "./Main.css";
import { MovieItem } from './MovieItem';

export class Main extends React.Component {
	render () {
		return (<div className="main">
			<h2>Featured</h2>
				<MovieItem name="test" imageUrl="https://cataas.com/cat/says/hello%20world!" />
			<h2>Genre</h2>
			<h2>Most recent</h2>
		</div>)
	}
}
