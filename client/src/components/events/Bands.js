import React from 'react';
import { connect } from 'react-redux';

const Bands = ({ bands }) => {
  return bands;
};

const mapStateToProps = state => ({
  bands: state.bands
});

export default connect(mapStateToProps)(Bands);
