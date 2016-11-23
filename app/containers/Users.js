import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Components from '../components'
import * as Actions from '../actions'

class Users extends React.Component {
	render() {
		return (
			<div>
				<h1>Users Page</h1>
				<div>State inside the Users Container: {this.props.count}</div>
				<hr />
				<div>Counter Component:</div>
				<Components.Counter />
			</div>
		);
	}
}

// Users.propTypes = {
  // name: React.PropTypes.string
// };

const mapStateToProps = (state) => ({
	count: state.counter.count
})

function mapDispatchToProps(dispatch) {
	return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
