import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants/ActionTypes';

export default function CountReducer(state = { count: 0 }, action) {
	const count = state.count
	switch (action.type) {
	case INCREMENT_COUNTER:
		return { count: count + 1 }
	default:
		return state
	}
}
