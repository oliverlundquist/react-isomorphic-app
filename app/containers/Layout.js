import React from 'react';
import { Link } from 'react-router';

export class Layout extends React.Component {
	render() {
		return (
			<div className="app-container">
				<header>
					<Link to="/">Home</Link>
					<span style={{margin:'0 5px'}}>|</span>
					<Link to="/users">Users</Link>
				</header>
				<div className="app-content">{this.props.children}</div>
				<footer style={{borderTop:'1px solid #000',marginTop:'15px'}}>
					<p>This is where the footer goes.</p>
				</footer>
			</div>
		);
	}
}
