import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createEvent } from '../../actions/profile';

const AddEvent = ({ createEvent }) => {
  const [formData, setFormData] = useState({
    bands: {
      headliner: '',
      openers: '',
    },
    city: '',
    venue: '',
    date: ''
  });

  const { bands: { headliner, openers }, city, venue, date } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeBands = e =>
    setFormData({ ...formData, bands: { ...formData.bands, [e.target.name]: e.target.value }});

  const onSubmit = e => {
    e.preventDefault();
    createEvent(formData);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add An Event</h1>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={e =>
          onSubmit(e)}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Headliner"
            name="headliner"
            value={headliner || ''}
            onChange={e => onChangeBands(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Openers (separated by commas)"
            name="openers"
            value={openers || ''}
            onChange={e => onChangeBands(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Venue"
            name="venue"
            value={venue}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* City"
            name="city"
            value={city}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            placeholder="* Date"
            name="date"
            value={date}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" value="Submit" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Dashboard
        </Link>
      </form>
    </Fragment>
  );
};

AddEvent.propTypes = {
  createEvent: PropTypes.func.isRequired
};

export default connect(
  null,
  { createEvent }
)(withRouter(AddEvent));
