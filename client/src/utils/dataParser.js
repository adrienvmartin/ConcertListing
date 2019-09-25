export const bandSplitter = bands => {
  const bandList = [];
  const headliner = bands.headliner;
  const openers = bands.openers;

  const openerSplit = openers.split(', ');

  for (let i = 0; i < openerSplit.length; i++) {
    bandList.push(openerSplit[i]);
  }

  bandList.push(headliner);

  bandList.sort();

  /*
  const counts = {};

  bandList.forEach((x) => { counts[x] = (counts[x] || 0)+1; });
  const fullBandList = [];

  for (let n = 0; n < Object.entries(counts).length; n++) {
    fullBandList.push(Object.entries(counts)[n]);
  }


  fullBandList.shift();
  fullBandList.pop();
  fullBandList.sort((a, b) => { return b[1] - a[1]; }); */

  return bandList;
};

export const yearSplitter = (date) => {
  return date.toString().slice(0,4);
};
