import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const increment = () => ({ type: 'increase' })
const Users = ({count}) => ( <p>users<Link to="/">go to top</Link></p> )

const mapStateToProps = (state) => ({
  count: state.count
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ increment: increment }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
