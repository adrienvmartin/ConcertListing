import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(
    () => {
      getCurrentProfile();
    },
    [getCurrentProfile]
  );

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Welcome, {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          Welcome back! Keep adding events to keep this up-to-date.
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, why not do it now?</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Your Profile
          </Link>
        </Fragment>
      )}
      <div className="my-2">
        <Button variant="contained" color="secondary" onClick={() => deleteAccount()}>Delete My Account</Button>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
