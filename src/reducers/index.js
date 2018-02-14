import { combineReducers } from 'redux';
import PlayersReducer from './reducer_players';
import ActivePlayer from './reducer_active_player';
import TeamsReducer from './reducer_teams';
import PositionsReducer from './reducer_positions';

const rootReducer = combineReducers({
	players: PlayersReducer,
	activePlayer: ActivePlayer,
	teams: TeamsReducer,
	positions: PositionsReducer
});

export default rootReducer;
