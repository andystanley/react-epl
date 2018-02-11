import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPlayer, getPlayers, getTeams } from '../actions';
import { bindActionCreators } from 'redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class PlayerTable extends Component {
	constructor(props) {
	    super(props);

	    this.options = {
	      defaultSortName: 'total_points',  // default sort column name
	      defaultSortOrder: 'desc'  // default sort order
	    };
    }

	componentDidMount() {
		this.props.getPlayers();
		this.props.getTeams();
	}

	clubFormatter(cell, row) {
		if (this.props.teams[cell]) {
			return this.props.teams[cell].name;
		}

  	}

	render() {
	    return (
	    	<div>
		    	<BootstrapTable data={ this.props.players } options={ this.options } exportCSV={ true } keyField='id' height='500' scrollTop={ 'Bottom' }>
		    		<TableHeaderColumn dataField='first_name' filter={ { type: 'TextFilter', delay: 300 } } dataSort>First Name</TableHeaderColumn>
		        	<TableHeaderColumn dataField='second_name' filter={ { type: 'TextFilter', delay: 300 } } dataSort>Last Name</TableHeaderColumn>
		       		<TableHeaderColumn dataField='team_code' dataFormat={ this.clubFormatter.bind(this) } filterFormatted filter={ { type: 'SelectFilter', options: teams } } dataSort>Club</TableHeaderColumn>
		        	<TableHeaderColumn dataField='total_points' dataSort>Total Points</TableHeaderColumn>
		       		<TableHeaderColumn dataField='form' dataSort>Form</TableHeaderColumn>
		        	<TableHeaderColumn dataField='goals_scored' dataSort>Goals</TableHeaderColumn>
		        	<TableHeaderColumn dataField='assists' dataSort>Assists</TableHeaderColumn>
		      </BootstrapTable>
	      </div>
    	);
	}
}

const teams = {
	3: 'Arsenal',
	91: 'Bournemouth',
	36: 'Brighton',
	90: 'Burnley',
	8: 'Chelsea',
	31: 'Crystal Palace',
	11: 'Everton',
	38: 'Huddersfield',
	13: 'Leicester',
	14: 'Liverpool',
	43: 'Man City',
	1: 'Man Utd',
	4: 'Newcastle',
	20: 'Southampton',
	110: 'Stoke',
	80: 'Swansea',
	6: 'Spurs',
	57: 'Watford',
	35: 'West Brom',
	21: 'West Ham',
};

// Connects react and redux
function mapStateToProps(state) {
	return {
		players: state.players,
		teams: state.teams
	};
}

// Promote PlayerList From a component to a container
export default connect(mapStateToProps, { getPlayers, getTeams, selectPlayer })(PlayerTable);