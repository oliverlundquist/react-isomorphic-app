export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'

export const increment = () => ({
	// type: INCREMENT_COUNTER
	type: 'increase'
})

export const incrementIfOdd = () => (dispatch, getState) => {
	const { counter } = getState()

	if (counter % 2 === 0) {
		return
	}

	dispatch(increment())
}

export const incrementAsync = (delay = 1000) => dispatch => {
	setTimeout(() => {
		dispatch(increment())
	}, delay)
}
