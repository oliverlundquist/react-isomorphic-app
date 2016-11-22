import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
const increment = () => ({ type: 'increase' })
const Counter = ({increment, counter}) => ( <p>{counter}<button onClick={increment}>+</button></p> )

const mapStateToProps = (state) => ({
  counter: state.count
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ increment: increment }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
