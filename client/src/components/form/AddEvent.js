import 'date-fns';
import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createEvent } from '../../actions/event';
import { Paper, TextField } from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const AddEvent = ({ createEvent, history }) => {
  const today = new Date();
  const fullDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  const [formData, setFormData] = useState({
    bands: {
      headliner: '',
      openers: ''
    },
    city: '',
    venue: '',
    date: '',
  });
  const [selectedDate, setSelectedDate] = useState(fullDate.toString());

  const {
    bands: { headliner, openers },
    city,
    venue,
    date
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeBands = e =>
    setFormData({
      ...formData,
      bands: { ...formData.bands, [e.target.name]: e.target.value }
    });

  const handleDateChange = date => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      date: date
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    createEvent(formData, history);
  };

  const styles = {
    minWidth: 500,
    paper: {
      margin: 'auto',
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add An Event</h1>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <TextField
            type="text"
            placeholder="* Headliner"
            name="headliner"
            value={headliner || ''}
            onChange={e => onChangeBands(e)}
            required
            style={styles}
          />
        </div>
        <div className="form-group">
          <TextField
            type="text"
            placeholder="Openers (separated by commas)"
            name="openers"
            value={openers || ''}
            onChange={e => onChangeBands(e)}
            style={styles}
          />
        </div>
        <div className="form-group">
          <TextField
            type="text"
            placeholder="* Venue"
            name="venue"
            value={venue}
            onChange={e => onChange(e)}
            required
            style={styles}
          />
        </div>
        <div className="form-group">
          <TextField
            type="text"
            placeholder="* City"
            name="city"
            value={city}
            onChange={e => onChange(e)}
            required
            style={styles}
          />
        </div>
        <div className="form-group">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker"
              label="Select A Date"
              format="yyyy/MM/dd"
              value={selectedDate}
              onChange={handleDateChange}
              style={styles}
            />
          </MuiPickersUtilsProvider>
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
