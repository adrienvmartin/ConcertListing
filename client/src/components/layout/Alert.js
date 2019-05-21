import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.message}
    </div>
  ));

Alert.propTypes = {
  alert: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(Alert);
