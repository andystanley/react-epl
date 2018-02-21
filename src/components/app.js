import React, { Component } from 'react';
import PlayerTable from '../containers/player-table';

export default class App extends Component {
  render() {
    return (
        <div id="container">
          	<h3>Fantasy Premier League Players</h3>
        	<PlayerTable />
        </div>
    );
  }
}
