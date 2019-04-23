import React from 'react';
import { connect } from 'react-redux';

import { getItems } from '../actions';

let Button = ({ getItems }) => (
  <button className='ghost-button-border-color' onClick={getItems}>
    Find your SPA
  </button>
);
const mapDispatchToProps = {
  getItems: getItems
};

export default connect(
  null,
  mapDispatchToProps
)(Button);