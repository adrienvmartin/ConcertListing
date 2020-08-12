import React from 'react';
import ListingsTable from './ListingsTable';
import ItemTable from './ItemTable';

const data = [
  {
    _id: 1,
    bands: {
      headliner: "Pantera",
      openers: "Skrape, Morbid Angel",
    },
    city: "Saskatoon",
    venue: "Saskatchewan Place",
    date: "2001-07-31"
  },
  {
    _id: 2,
    bands: {
      headliner: "Def Leppard",
      openers: "Ricky Warwick",
    },
    city: "Saskatoon",
    venue: "Saskatchewan Place",
    date: "2003-09-12"
  }
];

const bands = [
  {
    name: "Pantera",
    instances: 1,
  },
  {
    name: "Skrape",
    instances: 1
  }
]

const Demo = () => {
  return (
    <div>
      <div className="landing-inner">
      <h1 className="x-large">Demo</h1>
      This is a demo. Try it out!
      <br />
        <ListingsTable data={data} />  
        <br />
        <ItemTable data={bands} headerTitle={"Bands"} />
      </div>  
    </div>
  );
}

export default Demo;