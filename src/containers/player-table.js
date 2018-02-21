import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPlayer, getPlayers, getPositions, getTeams } from '../actions';
import { bindActionCreators } from 'redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PlayerModal from '../components/player-modal';

class PlayerTable extends Component {
	constructor(props, context) {
	    super(props, context);

    	this.state = {
      		modalShow: false,
      		selectedPlayer: {}
    	};

	    this.options = {
	      defaultSortName: 'total_points',  // default sort column name
	      defaultSortOrder: 'desc',
	      onRowClick: this.playerClicked.bind(this)
	    };
    }

	componentDidMount() {
		this.props.getPlayers();
		this.props.getTeams();
		this.props.getPositions();
	}

	clubFormatter(cell, row) {
		if (this.props.teams[cell]) {
			return this.props.teams[cell].name;
		}
  	}

  	positionFormatter(cell, row) {
  		if (this.props.positions[cell]) {
			return this.props.positions[cell].singular_name_short;
		}
  	}

  	playerClicked(row, columnIndex, rowIndex, e) {
  		this.props.selectPlayer(row);
  		this.setState({ selectedPlayer: row });
  		this.setState({ modalShow: true });
	}

	render() {
		let modalClose = () => this.setState({ modalShow: false });
	    return (
	    	<div>
		    	<BootstrapTable data={ this.props.players } options={ this.options } exportCSV={ true } keyField='id' height='500' scrollTop={ 'Bottom' } striped hover>
		    		<TableHeaderColumn dataField='first_name' width='150' filter={ { type: 'TextFilter', delay: 300 } } dataSort>First Name</TableHeaderColumn>
		        	<TableHeaderColumn dataField='second_name' width='150' filter={ { type: 'TextFilter', delay: 300 } } dataSort>Last Name</TableHeaderColumn>
		       		<TableHeaderColumn dataField='element_type' width='125' dataFormat={ this.positionFormatter.bind(this) } filterFormatted filter={ { type: 'SelectFilter', options: positions } } dataSort>Position</TableHeaderColumn>
		       		<TableHeaderColumn dataField='team_code' width='125' dataFormat={ this.clubFormatter.bind(this) } filterFormatted filter={ { type: 'SelectFilter', options: teams } } dataSort>Club</TableHeaderColumn>
		        	<TableHeaderColumn dataField='total_points' width='85' dataSort>Points</TableHeaderColumn>
		       		<TableHeaderColumn dataField='form' width='85' dataSort>Form</TableHeaderColumn>
		        	<TableHeaderColumn dataField='goals_scored' width='85' dataSort>Goals</TableHeaderColumn>
		        	<TableHeaderColumn dataField='assists' width='85' dataSort>Assists</TableHeaderColumn>
		      </BootstrapTable>
		      <PlayerModal show={this.state.modalShow} onHide={modalClose} selectedPlayer={this.state.selectedPlayer} />
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

const positions = {
	1: 'GKP',
	2: 'DEF',
	3: 'MID',
	4: 'FWD'
};

// Connects react and redux
function mapStateToProps(state) {
	return {
		players: state.players,
		teams: state.teams,
		positions: state.positions
	};
}

// Promote PlayerList From a component to a container
export default connect(mapStateToProps, { getPlayers, getTeams, getPositions, selectPlayer })(PlayerTable);