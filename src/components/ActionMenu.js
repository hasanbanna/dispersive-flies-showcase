import React, { Component } from 'react';
import ActionMenuInput from './ActionMenuInput';

export default class ActionMenu extends Component {
  render () {
    return(
      <div className="action-menu">
        <strong>Action Menu</strong>
        <ActionMenuInput name="no. of flies" value="30" min="30" max="100"/>
        <ActionMenuInput name="no. of iterations" value="30" min="30" max="100" />
        <ActionMenuInput name="disturbance" value="0.0001" step="0.0001" min="0.0001" max="0.1" />
        <button className="button">Start Simulation</button>
      </div>

    ) 
  }  
}