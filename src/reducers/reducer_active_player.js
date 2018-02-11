import { PLAYER_SELECTED } from '../actions/index';

export default function(state = null, action) {
	switch (action.type) {
		case PLAYER_SELECTED:
			return action.payload.data;
	}
	return state;
}