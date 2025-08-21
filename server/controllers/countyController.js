// controllers/countyController.js

const { specialAggregations } = require('../lib/dataMappings.js');

let confirmedCollection, deathsCollection, popCollection, countyVaccCollection;

function setCollections(collections) {
  confirmedCollection = collections.covid_confirmed_usafacts;
  deathsCollection = collections.covid_deaths_usafacts;
  popCollection = collections.population;
  countyVaccCollection = collections.vaccine;
}

// Helper for daily data processing
// controllers/countyController.js

// NEW: A simpler helper that works with the new data structure
function processDailyData(record, type) {
  const dailyData = record.daily_data || [];
  const out = [];
  let prevValue = 0;

  // The daily_data array is already sorted by date from the Python script
  for (const day of dailyData) {
    const value = day[type]; // 'type' will be 'cases' or 'deaths'
    const change = value - prevValue;

    out.push({
      date: day.date,
      [type]: value,
      [`new_${type}`]: change
    });
    
    prevValue = value;
  }
  return out;
}
// Helper to aggregate time-series data for multiple counties
function aggregateTimeSeries(countyData, name) {
  const aggregatedRecord = {};
  for (const record of countyData) {
    for (const key in record) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(key)) {
        if (!aggregatedRecord[key]) aggregatedRecord[key] = 0;
        aggregatedRecord[key] += record[key];
      } else {
        if (!aggregatedRecord[key]) aggregatedRecord[key] = record[key];
      }
    }
  }
  aggregatedRecord.county_name = `${name} (Aggregated)`;
  return aggregatedRecord;
}

// ==========================================================
// The Single, Smart Search Helper Function
// ==========================================================
async function performSmartSearch(collection, queryField, state, county) {
  // Step 1: Check for special aggregations FIRST.
  const specialCase = specialAggregations[county];
  if (specialCase && (specialCase.state === state || specialCase.state_long === state)) {
    const specialQuery = { state: specialCase.state, [queryField]: { $in: specialCase.counties } };
    const results = await collection.find(specialQuery).toArray();
    if (results.length > 0) {
      return { results, type: 'aggregation', name: county };
    }
  }

  // Step 2: If not a special case, perform the standard smart search.
  const searchVariations = [county];
  if (county.endsWith(' County')) {
    searchVariations.push(county.replace(' County', ''));
  } else if (county.endsWith(' city')) {
    searchVariations.push(county.replace(' city', ''));
  } else {
    searchVariations.push(`${county} County`);
    searchVariations.push(`${county} city`);
  }
  const uniqueVariations = [...new Set(searchVariations)];
  for (const searchTerm of uniqueVariations) {
    const query = {
      [queryField]: searchTerm,
      "$or": [{ "state": state }, { "state_long": state }]
    };
    const results = await collection.find(query).toArray();
    if (results.length > 0) {
      return { results, type: 'standard' };
    }
  }

  // Step 3: If all searches fail, return no results.
  return { results: [], type: 'none' };
}


// ==========================================================
// All Controller Functions Now Use the Same Helper
// ==========================================================

async function getCountyCases(req, res) {
  try {
    const { state, county } = req.query;
    const searchResult = await performSmartSearch(confirmedCollection, 'county_name', state, county);

    if (searchResult.results.length === 0) return res.send([]);

    if (searchResult.type === 'aggregation') {
      const aggregatedRecord = aggregateTimeSeries(searchResult.results, searchResult.name);
      return res.send(processDailyData(aggregatedRecord, 'cases'));
    } else {
      return res.send(processDailyData(searchResult.results[0], 'cases'));
    }
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch county cases." });
  }
}

async function getCountyDeaths(req, res) {
    try {
        const { state, county } = req.query;
        const searchResult = await performSmartSearch(deathsCollection, 'county_name', state, county);
    
        if (searchResult.results.length === 0) return res.send([]);
    
        if (searchResult.type === 'aggregation') {
          const aggregatedRecord = aggregateTimeSeries(searchResult.results, searchResult.name);
          return res.send(processDailyData(aggregatedRecord, 'deaths'));
        } else {
          return res.send(processDailyData(searchResult.results[0], 'deaths'));
        }
      } catch (err) {
        res.status(500).send({ error: "Failed to fetch county deaths." });
      }
}

async function getCountyPop(req, res) {
  try {
    const { state, county } = req.query;
    const searchResult = await performSmartSearch(popCollection, 'county_name', state, county);

    if (searchResult.results.length === 0) return res.send({});

    if (searchResult.type === 'aggregation') {
        const totalPopulation = searchResult.results.reduce((sum, doc) => sum + doc.population, 0);
        const representativeDoc = { ...searchResult.results[0], population: totalPopulation, county_name: `${searchResult.name} (Aggregated)` };
        return res.send(representativeDoc);
    } else {
        return res.send(searchResult.results[0]);
    }
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch county population." });
  }
}

async function getCountyVacc(req, res) {
    try {
        const { state, county } = req.query;
        const searchResult = await performSmartSearch(countyVaccCollection, 'county', state, county);

        if (searchResult.results.length === 0) return res.send([]);

        if (searchResult.type === 'aggregation') {
            const dailyTotals = {};
            searchResult.results.forEach(doc => {
                if (!dailyTotals[doc.date]) {
                    dailyTotals[doc.date] = { count: 0, state: doc.state, state_long: doc.state_long, date: doc.date, county: `${searchResult.name} (Aggregated)` };
                }
                dailyTotals[doc.date].count += doc.count;
            });
            return res.send(Object.values(dailyTotals).sort((a, b) => new Date(b.date) - new Date(a.date)));
        } else {
            return res.send(searchResult.results.sort((a, b) => new Date(b.date) - new Date(a.date)));
        }
      } catch (err) {
        res.status(500).send({ error: "Failed to fetch county vaccine data." });
      }
}

async function getLatestCountyCases(req, res) {
  try {
    const { state, county } = req.query;
    // This helper will find the single county document using smart search
    const searchResult = await performSmartSearch(confirmedCollection, 'county_name', state, county);
    if (searchResult.results.length === 0) return res.send({});
    
    // Get the single document (it could be aggregated or standard)
    let docToProcess;
    if (searchResult.type === 'aggregation') {
      docToProcess = aggregateTimeSeries(searchResult.results, searchResult.name);
    } else {
      docToProcess = searchResult.results[0];
    }

    // The daily_data is already sorted, so the last element is the latest
    const latestData = docToProcess.daily_data[docToProcess.daily_data.length - 1];
    res.send(latestData || {});
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch latest county cases." });
  }
}

async function getLatestCountyDeaths(req, res) {
  try {
    const { state, county } = req.query;
    const searchResult = await performSmartSearch(deathsCollection, 'county_name', state, county);
    if (searchResult.results.length === 0) return res.send({});

    let docToProcess;
    if (searchResult.type === 'aggregation') {
      docToProcess = aggregateTimeSeries(searchResult.results, searchResult.name);
    } else {
      docToProcess = searchResult.results[0];
    }
    
    const latestData = docToProcess.daily_data[docToProcess.daily_data.length - 1];
    res.send(latestData || {});
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch latest county deaths." });
  }
}

async function getLatestCountyVacc(req, res) {
  try {
    const { state, county } = req.query;
    // The vaccine data is not nested, so we can query it directly
    // The smart search finds all relevant documents, already sorted by date
    const searchResult = await performSmartSearch(countyVaccCollection, 'county', state, county);
    if (searchResult.results.length === 0) return res.send({});

    if (searchResult.type === 'aggregation') {
        const dailyTotals = {}; // Aggregate and find the latest
        searchResult.results.forEach(doc => {
            if (!dailyTotals[doc.date]) {
                dailyTotals[doc.date] = { count: 0, date: doc.date };
            }
            dailyTotals[doc.date].count += doc.count;
        });
        const latestDate = Object.keys(dailyTotals).sort().pop();
        return res.send(dailyTotals[latestDate] || {});
    } else {
        // The results are already sorted by date, so the first is the latest
        return res.send(searchResult.results[0]);
    }
  } catch(err) {
      res.status(500).send({ error: "Failed to fetch latest county vaccine data." });
  }
}

module.exports = {
  setCollections,
  getCountyCases,
  getCountyDeaths,
  getCountyPop,
  getCountyVacc,
  getLatestCountyCases,
  getLatestCountyDeaths,
  getLatestCountyVacc
};