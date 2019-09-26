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

/* Intended Data Structure:

profile: {
  events: [
    {
      bands: {
        headliner: 'Headliner',
        openers: ['Array', 'of', 'openers']
      },
      city: 'City',
      venue: 'Venue',
      date: 'date'
    },
    {
      bands: {
        headliner: 'Other Headliner',
        openers: ['Second', 'Array']
      },
      city: 'Some Town',
      venue: 'Some Place',
      date: 'Another Date'
    }
  ],
  bands: [
    {
      name: 'Headliner',
      instances: [instance1],
      instanceCount: 1,
      cities: 1,
      venues: 1
    },
    {
      name: 'Array',
      instanceCount: 2,
      instances: [instance1, instance2],
      cities: 2,
      venues: 2
    }
  ],
  cities: [
    {
      name: 'City',
      instances: [instance1],
      instanceCount: 1,
      venues: 1,
      bands: ['Headliner', 'Array', 'Of', 'Openers']
    },
    {
      name: 'Some Town',
      instances: [instance1],
      instanceCount: 2,
      venues: 1,
      bands: ['Other Headliner', 'Second', 'Array']
    }
  ]
};

*/
