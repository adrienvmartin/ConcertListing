import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Link } from 'react-router-dom';

const EditEvent = ({
  defaultId,
  defaultHeadliner,
  defaultOpeners,
  defaultCity,
  defaultVenue,
  defaultDate,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    id: defaultId,
    bands: {
      headliner: defaultHeadliner,
      openers: defaultOpeners,
    },
    city: defaultCity,
    venue: defaultVenue,
    date: defaultDate
  });

  const {
    bands: { headliner, openers },
    city,
    venue,
    date
  } = formData;

  const [selectedDate, setSelectedDate] = useState(new Date(date));

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeBands = e => {
    setFormData({
      ...formData,
      bands: { ...formData.bands, [e.target.name]: e.target.value }
    });
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      date: date
    });
  };

  const styles = {
    minWidth: 500
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Edit Event</h1>
      <small>* = required field</small>
      <form className="form" onSubmit={() => onSubmit(formData.id, formData)}>
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
        <Button variant="contained" color="primary">Submit</Button>
        <Link className="btn btn-light my-1" to="/dashboard">
          Dashboard
        </Link>
      </form>
    </Fragment>
  );
};

export default EditEvent;
