import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class PlayerModal extends Component {
	renderName() {
		return <div>{this.props.playerName.first_name} {this.props.playerName.second_name}</div>;
	}
	
	renderContent() {
    	return (
    		<p>Statistics appear here</p>
    	);
    }

	render() {
		return (
	      <Modal
		        {...this.props}
		        bsSize="large"
		        aria-labelledby="contained-modal-title-lg">
		        <Modal.Header closeButton>
		          <Modal.Title id="contained-modal-title-lg">{this.renderName()}</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>
		          <h5>Statistics by Season</h5>
		          	{this.renderContent()}

		        </Modal.Body>
		        <Modal.Footer>
		          <Button onClick={this.props.onHide}>Close</Button>
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
