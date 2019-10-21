export const bandSplitter = bands => {
  // Needs to be one band at a time?
  const bandList = [];
  const headliner = bands.headliner;
  const openers = bands.openers;

  const openerSplit = openers.split(', ');

  for (let i = 0; i < openerSplit.length; i++) {
    bandList.push(openerSplit[i]);
  }

  bandList.push(headliner);
  bandList.sort();
  return bandList;
};

export const duplicateCheck = bands => {
  return bands.filter((item, index) => {
    return bands.indexOf(item) >= index;
  });
};

export const instanceCalculator = bandArray => {
  const count = {};
  bandArray.forEach(b => {
    count[b] = (count[b] || 0) + 1;
  });
};

export const yearSplitter = date => {
  return date.toString().slice(0, 4);
};
