import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { readEndpoint, setHeaders, setEndpointHost, setEndpointPath, setAccessToken } from 'redux-json-api-without-credentials'

class Products extends React.Component {
	componentWillMount() {
		// this.props.dispatch(setAccessToken(this.props.tokens.access_token))
		// this.props.dispatch(setHeaders({
			// 'Authorization': 'Bearer ' + this.props.tokens.access_token,
			// 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImUxNWQ5MTJhNmMzY2IyZDcwOWFlZDM5ZjUwNTE0YWFlNjhhNTM5ODhhNGVmMTEwOWJlNDI0ZWIwYWIwMzA0M2JhM2M4NWU3NTM4MGFhYTcxIn0.eyJhdWQiOiIyIiwianRpIjoiZTE1ZDkxMmE2YzNjYjJkNzA5YWVkMzlmNTA1MTRhYWU2OGE1Mzk4OGE0ZWYxMTA5YmU0MjRlYjBhYjAzMDQzYmEzYzg1ZTc1MzgwYWFhNzEiLCJpYXQiOjE0NzU3NTE1ODcsIm5iZiI6MTQ3NTc1MTU4NywiZXhwIjo0NjMxNDI4Nzg3LCJzdWIiOiIyIiwic2NvcGVzIjpbIioiXSwibm9fbXlzdG9yZV9ob3N0cyI6WyJjaGlwcyJdfQ.ep7f7aJgfdwnmBQMXrTHf-aMMYjx3pS4wCKOJ1tp42A9HehJTXXWq7vExxoziy5FmMvqOlvh9UdxUkpooz76M8VPxaFzkp3RRXM938AP_zKgGAv9wliQLAIGNE1tx1hlbaRzf6q6lzbWKbi-rb45GOc8C7CrR4rzpuJu8HbJk0ezovpy210lTuEl5aIWMHGqpNSLyjuN6tYHF3vAnKaj8Z9936sWy4KfHfTuWAqBDJwtTyt8WuwtlxA0fRGBePe8bSy7KaTskP2FmysAizbn0Tga0bADmvtlrarcrzMu--5ZxEGUad8D5nCI-FVNiLXPvei5X8TSxXl1HfRVob8PVlcbmB7iA5ogNfl3czGh_EFoO3w_0AFQ1sX6aYxqfoKKoqIsd0kR04kMFA9yE0TlOyDlUt6xpRmjAnXFuX2Hk5SUZ10HdfEC5Yo8tFobzOi1PjQktGlEPrQBMojUJk05otYFJ8YqSjt9Z0xOQhnnPyN4ZiD4XhV5RVBt7kTIX2QSG6Z0BzDcgOsSS0gCrcb3SMciE5VvHSc7N2TLVXM20fCyYRrtXLxpejuois_bKkKOLQ30Ch7eC-_t0QdSEC-XfIzVTbYdx_FWymwRmz_ASthuy2Zr_KQQSNI4XY7gu4gtMUQBYCG48D5Zp8Qh-c37r56EM_Sa9fnqLVZmfWrsJlo',
			// 'Accept': 'application/vnd.api+json',
			// 'Content-Type': 'application/vnd.api+json',
			// 'Access-Control-Allow-Headers': 'Authorization'
		// }))
		// this.props.dispatch(setHeader({ 'host': '0.0.0.0' }))
		// this.props.dispatch(setEndpointHost('https://api.mystore.no'))
		// this.props.dispatch(setEndpointPath(''))
		// this.props.dispatch(readEndpoint('/shops/chips/products'))

		// <li key={product.id}><img src={'http://cdn.mystore4.no/cdn/70_57/chips/' + product.attributes.image} alt="" /></li>
	}

	render() {
		return (
			<div>
				Products!
				<ul>
					{this.props.products.data.map(product => (
						<li key={product.id}>{product.attributes.price}</li>
					))}
				</ul>
			</div>
		);
	}
}

// Users.propTypes = {
  // name: React.PropTypes.string
// };

// const mapStateToProps = ({ api: { products = { data: [] } } }) => ({ products });

// const mapStateToProps = (state) => ({
// 	api: state.api
// })

const mapStateToProps = ({
		api: { products = { data: [] } },
		session: { tokens }
	}) => ({ products, tokens })

// const mapStateToProps = (state) => ({
// 	tokens: state.session.tokens,
// 	api: state.api
// }) => ({ tokens, api })

function mapDispatchToProps(dispatch) {
	return bindActionCreators({}, dispatch)
}

// export default connect(mapStateToProps, mapDispatchToProps)(Products)
export default connect(mapStateToProps)(Products)
