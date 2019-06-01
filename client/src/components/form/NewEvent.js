import React, { Fragment, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import {
  HEADLINER_FIELD,
  HEADLINER_FIELD_LABEL,
  OPENERS_FIELD,
  OPENERS_FIELD_LABEL,
  VENUE_FIELD,
  VENUE_FIELD_LABEL,
  CITY_FIELD,
  CITY_FIELD_LABEL,
  DATE_FIELD,
  DATE_FIELD_LABEL
} from './constants';

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    headliner: '',
    openers: [],
    city: '',
    venue: '',
    date: ''
  });

  const { headliner, openers, venue, city, date } = formData;

  const onSubmit = e => {
    e.preventDefault();
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <form className="new-event" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <TextField
            name={HEADLINER_FIELD}
            label={HEADLINER_FIELD_LABEL}
            value={headliner}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <TextField
            name={OPENERS_FIELD}
            label={OPENERS_FIELD_LABEL}
            value={openers}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <TextField
            name={CITY_FIELD}
            label={CITY_FIELD_LABEL}
            value={city}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <TextField
            name={VENUE_FIELD}
            label={VENUE_FIELD_LABEL}
            value={venue}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <TextField
            name={DATE_FIELD}
            label={DATE_FIELD_LABEL}
            value={date}
            onChange={e => onChange(e)}
          />
        </div>
      </form>
    </Fragment>
  );
};

export default CreateEventForm;
