import React, { Fragment, useState } from 'react';

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    headliner: '',
    openers: [],
    venue: '',
    city: '',
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
          <input
            type="text"
            placeholder="Headliner"
            name="headliner"
            value={headliner}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Openers"
            name="openers"
            value={openers}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Venue"
            name="venue"
            value={venue}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={city}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Date"
            name="date"
            value={date}
            onChange={e => onChange(e)}
          />
        </div>
      </form>
    </Fragment>
  );
};

export default CreateEventForm;
