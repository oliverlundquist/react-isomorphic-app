import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const increment = () => ({ type: 'increase' })
const Counter = ({increment, counter}) => ( <p>{counter}<button onClick={increment}>+</button><Link to="/users">go to users</Link></p> )

const mapStateToProps = (state) => ({
  counter: state.count
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ increment: increment }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
