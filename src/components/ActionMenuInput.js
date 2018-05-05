import React, { Component } from 'react';

export default class ActionMenuInput extends Component {

  render () {
    return (
      <div className="action-menu-input">
        <label
          className="input-label"
          htmlFor={this.addDashesBetween(this.props.name)}>
          {this.props.name}
          </label>       
        <input 
          className="input-number"
          type="number"
          id={this.addDashesBetween(this.props.name)}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          dir="rtl"
          defaultValue={this.props.value}>
        </input>
       
      </div>
    )
  }
  
  addDashesBetween (string) {
    return string.split(' ').join('-');
  }
}