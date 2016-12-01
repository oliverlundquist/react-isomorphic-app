import React from 'react';
import { Link } from 'react-router';
import Radium, { Style } from 'radium';

const globalStyles = {
	body: {
		margin: 0,
		fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
	},
	html: {
		background: '#eee',
		fontSize: '100%'
	},
	mediaQueries: {
		'(min-width: 550px)': {
			html: {
				fontSize: '120%'
			}
		},
		'(min-width: 1200px)': {
			html: {
				fontSize: '140%'
			}
		}
	},
	'h1, h2, h3': {
		fontWeight: 'bold'
	}
}

export class Layout extends React.Component {
	render() {
		return (
			<div className="app-container">
				<Style rules={globalStyles} />
				<header>
					<Link to="/">Home</Link>
					<span style={{margin:'0 5px'}}>|</span>
					<Link to="/users">Users</Link>
					<span style={{margin:'0 5px'}}>|</span>
					<Link to="/products">Products</Link>
					<a href="/products">Products (direct linkz)</a>
				</header>
				<div className="app-content">{this.props.children}</div>
				<footer style={{borderTop:'1px solid #000',marginTop:'15px'}}>
					<p>This is where the footer goes.</p>
				</footer>
			</div>
		);
	}
}
