// controllers/stateController.js

let weeklyCasesDeathsCollection, vaccCollection, confirmedCollection, deathsCollection;

function setCollections(collections) {
  weeklyCasesDeathsCollection = collections.weekly_cases_deaths;
  vaccCollection = collections.vaccine;
  confirmedCollection = collections.covid_confirmed_usafacts;
  deathsCollection = collections.covid_deaths_usafacts;
  popCollection = collections.population;
}

// Helper function to aggregate county-level data to a state-level daily total
function processAggregatedData(confirmed, deaths) {
  const aggregatedData = {};

  // REVISED: This inner function now processes the nested 'daily_data' array
  const processData = (data, type) => {
    // 'data' is an array of county documents, e.g., [{ daily_data: [...] }, { daily_data: [...] }]
    for (const countyRecord of data) {
      if (countyRecord.daily_data) {
        // Loop through the daily_data array for each county
        for (const day of countyRecord.daily_data) {
          const date = day.date;
          if (!aggregatedData[date]) {
            aggregatedData[date] = { date: date, cases: 0, new_cases: 0, deaths: 0, new_deaths: 0 };
          }
          // Add the value ('cases' or 'deaths') from the daily entry
          aggregatedData[date][type] += day[type];
        }
      }
    }
  };

  processData(confirmed, 'cases');
  processData(deaths, 'deaths');
  
  // This part for calculating daily changes remains the same and is correct
  const sortedDates = Object.keys(aggregatedData).sort();
  let prevCases = 0;
  let prevDeaths = 0;
  for (const date of sortedDates) {
    const dayData = aggregatedData[date];
    dayData.new_cases = dayData.cases - prevCases;
    dayData.new_deaths = dayData.deaths - prevDeaths;
    prevCases = dayData.cases;
    prevDeaths = dayData.deaths;
  }
  return Object.values(aggregatedData);
}

// ==========================================================
// Controller Functions for State Data
// ==========================================================

async function getAllStates(req, res) {
  try {
    const uniqueStates = await weeklyCasesDeathsCollection.distinct("state");
    res.send(uniqueStates.sort());
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch unique states." });
  }
}

async function getStateData(req, res) {
  try {
    const stateIdentifier = req.query.state;
    if (!stateIdentifier) return res.status(400).send({ error: "No State provided." });

    const query = {
      "$or": [{ "state": stateIdentifier }, { "state_long": stateIdentifier }]
    };

    const data = await weeklyCasesDeathsCollection.find(query).sort({ "end_date": -1 }).limit(1).toArray();
    
    if (data.length > 0) {
      res.send(data[0]);
    } else {
      res.send({});
    }
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch state data." });
  }
}

async function getStateVacc(req, res) {
  try {
    const stateIdentifier = req.query.state;
    if (!stateIdentifier) return res.status(400).send({ error: "No State provided." });
    
    // UPDATED: Query vaccine collection by short or long state name
    const query = {
        "$or": [{ "state": stateIdentifier }, { "state_long": stateIdentifier }]
    };
    
    // Simple aggregation: group by date and sum counts
    const results = await vaccCollection.find(query).toArray();
    const dailyTotals = {};
    results.forEach(doc => {
        if (!dailyTotals[doc.date]) {
            dailyTotals[doc.date] = { count: 0, state: doc.state, state_long: doc.state_long, date: doc.date };
        }
        dailyTotals[doc.date].count += doc.count;
    });

    res.send(Object.values(dailyTotals).sort((a, b) => new Date(b.date) - new Date(a.date)));
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch state vaccine data." });
  }
}

async function getAggregatedStateData(req, res) {
  try {
    const stateIdentifier = req.query.state;
    if (!stateIdentifier) return res.status(400).send({ error: "No State provided." });
    
    // UPDATED: Query confirmed/deaths collections by short or long state name
    const query = {
        "$or": [{ "state": stateIdentifier }, { "state_long": stateIdentifier }]
    };

    const confirmedData = await confirmedCollection.find(query).toArray();
    const deathsData = await deathsCollection.find(query).toArray();

    if (confirmedData.length === 0 || deathsData.length === 0) {
      return res.send([]);
    }
    
    res.send(processAggregatedData(confirmedData, deathsData));
  } catch (err) {
    res.status(500).send({ error: "Failed to aggregate state data." });
  }
}

async function getLatestStateVacc(req, res) {
    try {
      const stateIdentifier = req.query.state;
      if (!stateIdentifier) return res.status(400).send({ error: "No State provided." });
      
      const query = {
          "$or": [{ "state": stateIdentifier }, { "state_long": stateIdentifier }]
      };
      
      // UPDATED: This new pipeline correctly calculates the true total.
      const aggregationPipeline = [
          // 1. Find all documents for the given state.
          { $match: query },
          // 2. Sort all documents by date, newest first.
          { $sort: { date: -1 } },
          // 3. Group by county and get the FIRST document (which is the newest).
          { $group: {
              _id: "$county",
              latest_count: { $first: "$count" },
              state_abbr: { $first: "$state" }
          }},
          // 4. Sum up the latest counts from each county to get the state total.
          { $group: {
              _id: "$state_abbr",
              total_vaccinations: { $sum: "$latest_count" }
          }}
      ];

      const result = await vaccCollection.aggregate(aggregationPipeline).toArray();
      
      if (result.length > 0) {
        res.send(result[0]);
      } else {
        res.send({ total_vaccinations: 0 });
      }
    } catch (err) {
      console.error('Aggregation Error:', err); // Added more specific logging
      res.status(500).send({ error: "Failed to fetch state vaccine total." });
    }
}
async function getStatePop(req, res) {
  try {
    const stateIdentifier = req.query.state;
    if (!stateIdentifier) return res.status(400).send({ error: "No State provided." });

    const query = {
      "$or": [{ "state": stateIdentifier }, { "state_long": stateIdentifier }]
    };
    
    // This pipeline finds all counties in a state and sums their population
    const pipeline = [
      { $match: query },
      { $group: {
          _id: "$state_long", // Group by the long name for a cleaner result
          total_population: { $sum: "$population" }
      }}
    ];

    const result = await popCollection.aggregate(pipeline).toArray();

    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.send({ total_population: 0 });
    }
  } catch (err) {
      res.status(500).send({ error: "Failed to fetch state population." });
  }
}

module.exports = {
  setCollections,
  getAllStates,
  getStateData,
  getStateVacc,
  getAggregatedStateData,
  getLatestStateVacc,
  getStatePop
};