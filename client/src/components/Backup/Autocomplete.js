import React, { Component } from 'react';

export default class Autocomplete extends Component {
  state = {
    formatted_address: this.props.formatted_address,
    place_id: this.props.place_id,
  };

  handleChange = event => {};

  render() {
    return (
      <>
        <input id='searchTextField' type='text' size='50' placeholder='Enter a location' runat='server' onChange={this.handleChange} />
        <input type='hidden' id='formatted_address' name='formatted_address' onChange={this.handleChange} />
        <input type='hidden' id='place_id' name='place_id' />
      </>
    );
  }
}
