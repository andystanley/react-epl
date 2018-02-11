import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPlayer } from '../actions/index';

class PlayerDetail extends Component {
	renderResults() {
		if (!this.props.player) {
			return <div>Select a Player</div>;
		}

    	return Object.values(this.props.player.history).map((history) => {
        	return (
				<li
					key={history.fixture}
					className="list-group-item">
					{history.kickoff_time_formatted}
				</li>
        	);
    	})
    }

	render() {
		return (
			<ul className="list-group col-lg-4">
				{this.renderResults()}
			</ul>
		);
	}
}

function mapStateToProps(state) {
	return { 
		player: state.activePlayer
	};
}

export default connect(mapStateToProps)(PlayerDetail);