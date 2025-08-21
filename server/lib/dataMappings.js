const specialAggregations = {
  // --- New York City ---
  // The original case for aggregating the five boroughs.
  'New York': {
    state: 'NY',
    counties: [
      'New York County', // Manhattan
      'Kings County',    // Brooklyn
      'Queens County',   // Queens
      'Bronx County',    // Bronx
      'Richmond County'  // Staten Island
    ]
  },

  // --- Kansas City Metro ---
  // A major metropolitan area that famously spans two states.
  // A user searching for "Kansas City" often means the entire metroplex.
  // Note: The 'state' property here is for the primary city.
  // The API would need to be enhanced to search across multiple states for this to work perfectly.
  'Kansas City Metro': {
    state: 'MO',
    counties: [
      'Jackson County',    // Contains downtown KCMO
      'Clay County',       // KCMO suburb
      'Platte County',     // KCMO suburb
      'Cass County',       // KCMO suburb
      'Wyandotte County',  // Contains Kansas City, KS
      'Johnson County'     // Major KS suburb
    ]
  },

  // --- St. Louis (City & County) ---
  // St. Louis is an independent city, completely separate from St. Louis County.
  // This aggregation combines them into a single entity for a more complete regional picture.
  'St. Louis (City & County)': {
    state: 'MO',
    counties: [
      'St. Louis County',
      'St. Louis city' // Note: Census data often uses 'city' as the county name
    ]
  },

  // --- Washington D.C. Metro ---
  // A large, complex region spanning a district, Maryland, and Virginia.
  // This combines the core counties and independent cities of the metro area.
  'Washington D.C. Metro': {
    state: 'DC',
    counties: [
      'District of Columbia',
      'Arlington County',
      'Fairfax County',
      'Loudoun County',
      'Prince William County',
      'Alexandria city',
      'Falls Church city',
      'Montgomery County',
      "Prince George's County"
    ]
  },

  // --- Richmond Metro (Virginia) ---
  // An example of an independent city in Virginia and its primary surrounding counties.
  'Richmond Metro': {
    state: 'VA',
    counties: [
      'Richmond city',
      'Henrico County',
      'Chesterfield County'
    ]
  }
};

module.exports = { specialAggregations };