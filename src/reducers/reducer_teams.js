import _ from 'lodash';
import { GET_TEAMS } from '../actions/index';

export default function(state = [], action) {
	switch (action.type) {
		case GET_TEAMS:
			return _.mapKeys(action.payload.data.teams, 'code');
	}
	return state;
}