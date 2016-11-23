import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class IndexPage extends React.Component {
	render() {
		return (
			<div>
				<h1>Index Page</h1>
			</div>
		);
	}
}

// IndexPage.propTypes = {
  // name: React.PropTypes.string
// };

const mapStateToProps = (state) => ({
	//
})

function mapDispatchToProps(dispatch) {
	return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
