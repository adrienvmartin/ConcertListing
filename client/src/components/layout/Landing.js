import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Demo from '../events/Demo';
import Bands from '../events/Bands';

const data = [
  {
    _id: 1,
    bands: {
      headliner: "Headlining Band",
      openers: "Opener 1, Opener 2"
    },
    city: "London",
    venue: "The Venue",
    date: "2000-01-01"
  },
];

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">ConcertLister</h1>
            <p className="lead">
              This is a tool for inputting, accessing, and organizing your concert-going data.
              Create events and keep track of the who, where, and when of the shows you've been to.
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-light">
                Login
              </Link>
              <br />
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
      <Demo data={data} />
      <br />
      <Bands bands={data} />
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

Landing.defaultProps = {
  isAuthenticated: false,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
