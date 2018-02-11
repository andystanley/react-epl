import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPlayer, getPlayers } from '../actions';
import { bindActionCreators } from 'redux';
import Collapsible from 'react-collapsible';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class PlayerList extends Component {
	componentDidMount() {
		this.props.getPlayers();
	}

	renderPlayers() {
    	return Object.values(this.props.players).map((player) => {
        	return (
	      		<tr key={player.id} onClick={() =>  this.props.selectPlayer(player)}>
		      		<th scope="row">{[player.first_name, player.second_name].join(' ')}</th>
		      		<td>{player.total_points}</td>
		      		<td>{player.goals_scored}</td>
		      		<td>{player.assists}</td>
		      	</tr>
        	);
    	})
	}

	render() {
		return (
			<div className="table-responsive vertical">
				<table className="table table-hover table-striped">
				  	<thead className="thead-inverse">
				    	<tr>
				      		<th scope="col">Player</th>
				      		<th scope="col">Total Points</th>
				      		<th scope="col">Goals</th>
				      		<th scope="col">Assists</th>
				    	</tr>
				  	</thead>
				  	<tbody>
						{this.renderPlayers()}
					</tbody>
				</table>
			</div>
		);
	}
}

// Connects react and redux
function mapStateToProps(state) {
	return {
		players: state.players
	};
}

// Promote PlayerList From a component to a container
export default connect(mapStateToProps, { getPlayers, selectPlayer })(PlayerList);