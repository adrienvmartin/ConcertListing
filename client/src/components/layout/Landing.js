import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Landing = props => {
  return (
    <Fragment>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Concert Database</h1>
            <p className="lead">
              Track your concerts and organize all relevant statistics and
              information in one convenient place!
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-light">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Landing.propTypes = {};

export default Landing;
