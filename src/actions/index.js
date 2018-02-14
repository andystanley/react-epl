import axios from 'axios';

const API_PLAYER = 'https://fantasy.premierleague.com/drf/element-summary/';
const API_SUMMARY = 'https://fantasy.premierleague.com/drf/bootstrap-static';

export const PLAYER_SELECTED = 'PLAYER_SELECTED';
export const GET_PLAYERS = 'GET_PLAYERS';
export const GET_TEAMS = 'GET_TEAMS';
export const GET_POSITIONS = 'GET_POSITIONS';

export function selectPlayer(player) {
	const url = `${API_PLAYER}${player.id}`;
	const request = axios.get(url);
	
	return {
		type: PLAYER_SELECTED,
		payload: request
	};
}

export function getPlayers() {
	const request = axios.get(API_SUMMARY);
	
	return {
		type: GET_PLAYERS,
		payload: request
	};
}

export function getTeams() {
	const request = axios.get(API_SUMMARY);
	
	return {
		type: GET_TEAMS,
		payload: request
	};
}

export function getPositions() {
	const request = axios.get(API_SUMMARY);

	return {
		type: GET_POSITIONS,
		payload: request
	}
}