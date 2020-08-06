import React from 'react';
import ListingsTable from './ListingsTable';

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

const Demo = () => {
  return (
    <div>
      <div className="landing-inner">
      <h1 className="x-large">Demo</h1>
      This is a demo. Try it out!
      <br />
        <ListingsTable data={data} />  
      </div>  
    </div>
  );
}

export default Demo;