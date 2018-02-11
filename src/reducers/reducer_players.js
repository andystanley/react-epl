import { GET_PLAYERS } from '../actions/index';

export default function(state = [], action) {
	switch (action.type) {
		case GET_PLAYERS:
			return action.payload.data.elements;
	}
	return state;
}