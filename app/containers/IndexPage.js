import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedNumber, FormattedMessage } from 'react-intl';

class IndexPage extends React.Component {
	getStyles(key) {
		return {
			loginBtn: {
				width: 360,
				height: 'auto'
			}
		}[key];
	}

	render() {
		return (
			<div>
				<FormattedMessage id="IndexPage.greeting" />
				<FormattedNumber value="100000000" />
				<h1>Index Page</h1>
				<a href={this.props.authUrl}><img style={this.getStyles('loginBtn')} src="https://s3-eu-west-1.amazonaws.com/mystore-api-auth-app/assets/mystore-api-login-btn.jpg" alt="Login with Mystore.no" /></a>
			</div>
		);
	}
}

IndexPage.defaultProps = {
	authUrl: 'http://passport.dev:8000/oauth/authorize?client_id=7&redirect_uri=http://consumer.dev:8010/callback&response_type=code&scope=read:products read:categories'
};

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
