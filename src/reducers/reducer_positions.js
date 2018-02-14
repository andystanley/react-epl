import _ from 'lodash';
import { GET_POSITIONS } from '../actions/index';

export default function(state = [], action) {
	switch (action.type) {
		case GET_POSITIONS:
			return _.mapKeys(action.payload.data.element_types, 'id');
	}
	return state;
}