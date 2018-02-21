import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

class PlayerModal extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
    		currentSeason: '2017/18', // This should never change
    		activeSeason: '2017/18' // This will change based on which tab is selected by the user
    	}

    	this.toggleSeason = this.toggleSeason.bind(this);
    	this.renderContent = this.renderContent.bind(this);
  	}

	renderHeader() {
		const { first_name, second_name } = this.props.selectedPlayer;
		
		return <div>{first_name} {second_name}</div>;
	}

	renderSeasons() {
		const { player } = this.props;
		const { activeSeason } = this.state;

		if (!player) {
			return <div>Loading...</div>;
		}

		return Object.values(player.history_past).map((history_past) => {
        	return (
        		<li key={history_past.season_name} className={history_past.season_name === activeSeason ? 'active': null}>
	        		<a href="#" onClick={this.toggleSeason}>
	        			{history_past.season_name}
	        		</a>
	        	</li>
        	);
    	});
	}
	
	renderContent() {
		const { player } = this.props;
		const { activeSeason, currentSeason } = this.state;
		var season;

		if (!player) {
			return <h4 className="center">The requested player could not be found</h4>;
		}

		season = _.filter(player.history_past, season => season.season_name === activeSeason);

		// If the season does not exist
		if (!season[0]) {
			return <h4 className="center">Select a season to view stats from that season</h4>;
		}

		return (
			<ul className="list-group">
				<li key={0} className="list-group-item">Points<span className="badge">{season[0].total_points}</span></li>
				<li key={1} className="list-group-item">Goals<span className="badge">{season[0].goals_scored}</span></li>
				<li key={2} className="list-group-item">Assists<span className="badge">{season[0].assists}</span></li>
				<li key={3} className="list-group-item">Total Bonus Points<span className="badge">{season[0].bonus}</span></li>
				<li key={4} className="list-group-item">BPS<span className="badge">{season[0].bps}</span></li>
			</ul>
		);
    }

    toggleSeason(event) {
  		this.setState({
    		activeSeason: event.target.innerHTML
  		});
    }

	render() {
		const { activeSeason, currentSeason } = this.state;
		return (
		  <Modal
				{...this.props}
			    bsSize="large"
			    aria-labelledby="contained-modal-title-lg">
		    	<Modal.Header className="modal-header" closeButton>
		      		<Modal.Title id="contained-modal-title-lg">
		      			{this.renderHeader()}
		      		</Modal.Title>
		    	</Modal.Header>
		    	<Modal.Body>
		      		<div className="box">
		      			<ul className="nav nav-tabs">
		      				{this.renderSeasons()}
		      				<li className={currentSeason === activeSeason ? 'active' : null}>
		            			<a href="#" onClick={this.toggleSeason}>2017/18</a>
		            		</li>
		            	</ul>
		        	</div>
	        		<div>
	      				{this.renderContent()}
	      			</div>
		    	</Modal.Body>
		    	<Modal.Footer>
		      		<Button className="btn-danger" onClick={this.props.onHide}>Close</Button>
		    	</Modal.Footer>
		  </Modal>
		);
	}
}

function mapStateToProps(state) {
	return { 
		player: state.activePlayer
	};
}

export default connect(mapStateToProps)(PlayerModal);
