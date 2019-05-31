import React, { Fragment, useState } from 'react';

const NewEventForm = () => {
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
      </form>
    </Fragment>
  );
};
