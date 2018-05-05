import React, { Component } from 'react';
import ActionMenuInput from './ActionMenuInput';

export default class ActionMenu extends Component {
  render () {
    return(
      <div className="action-menu">
        <h4>Action Menu</h4>
        <ActionMenuInput name="no. of flies" min="30" max="100" />
        <ActionMenuInput name="no. of iterations" min="30" max="100" />
        <ActionMenuInput name="disturbance" step="0.0001" min="0.0001" max="0.1" />
        <button>Start Simulation</button>
      </div>
      
    ) 
  }  
}