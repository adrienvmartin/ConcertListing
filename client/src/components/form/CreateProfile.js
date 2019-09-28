import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const CreateProfile = ({
  createProfile,
  getCurrentProfile,
  profile: { profile, loading },
  history
}) => {
  const [formData, setFormData] = useState({
    location: '',
    bio: '',
    favBands: ''
  });

  const { location, favBands, favShows, favPlace, favShowType } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };
  useEffect(
    () => {
      getCurrentProfile();
    },
    [getCurrentProfile]
  );

  return loading && profile === null ? (
    <Redirect to="/dashboard" />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">Enter some basic information about yourself here.</p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Favourite Bands"
            name="favBands"
            value={favBands}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Favourite Shows You've Been To"
            name="favShows"
            value={favShows}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <select name="favPlace" value={favPlace} onChange={e => onChange(e)}>
            <option value="0">---Favourite Place To Be At The Show?---</option>
            <option value="1">Front row, all the way!</option>
            <option value="2">Slamming in the mosh pit</option>
            <option value="3">Near the front, but off to the sides</option>
            <option value="4">Chilling out by the soundboard</option>
            <option value="5">Hanging out by the bar</option>
            <option value="6">
              Lounging around near the back of the venue
            </option>
          </select>
        </div>
        <div className="form-group">
          <select
            name="favShowType"
            value={favShowType}
            onChange={e => onChange(e)}
          >
            <option value="0">
              ---Favourite Type Of Concert To Attend?---
            </option>
            <option value="1">
              Small bars/and clubs where I can be right up close
            </option>
            <option value="2">Medium sized venues</option>
            <option value="3">Venues that are large, but not too large</option>
            <option value="4">Big arena concerts</option>
            <option value="5">Stadiums</option>
          </select>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
