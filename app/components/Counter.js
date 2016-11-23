import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Components from '../components'
import * as Actions from '../actions'

class Counter extends React.Component {
	render() {
		return (
			<div>
				{this.props.count}<button onClick={this.props.increment}>+</button>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	count: state.counter.count
})

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ increment: Actions.increment }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
