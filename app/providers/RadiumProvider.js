import React, { Component } from 'react'

export class RadiumProvider extends Component {
	getChildContext() {
		const { radiumConfig } = this.props
		return { _radiumConfig: radiumConfig }
	}

	render() {
		const { children } = this.props
		return React.cloneElement(children, { ...this.props })
	}
}

RadiumProvider.childContextTypes = {
	_radiumConfig: React.PropTypes.object,
}
