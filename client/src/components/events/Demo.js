import React from 'react';
import ListingsTable from './ListingsTable';

const Demo = (data) => {
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