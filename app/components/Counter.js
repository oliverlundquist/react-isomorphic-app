import React from 'react'
import Radium from 'radium'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'

@Radium
class Counter extends React.Component {
	getStyles(key) {
		const status = {
			notification: "#0074D9",
			success: "#27AE60",
			error: "#E74C3C"
		}
		return {
			alert: {
				position: "relative",
				width: "100%",
				padding: "5px",
				borderRadius: "3px",
				backgroundColor: status[this.props.type],
				color: "white",
				textAlign: "center",
				fontFamily: "'Helvetica Neue', sans-serif",
				success: {
					backgroundColor: status.success
				},
				error: {
					backgroundColor: status.error
				},
				':hover': {
					backgroundColor: '#eee'
				}
			}
		}[key];
	}

	render() {
		return (
			<div>
				{this.props.count}<button style={this.getStyles('alert')} onClick={this.props.increment}>+</button>
			</div>
		);
	}
}

Counter.defaultProps = { type: "notification" };

const mapStateToProps = (state) => ({
	count: state.counter.count
})

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ increment: Actions.increment }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
