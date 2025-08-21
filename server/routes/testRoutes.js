const express = require('express');
const router = express.Router();
const logger = require('../logger');

// These variables will be populated after the database connection is made.
let confirmedCollection, deathsCollection, popCollection, vaccCollection, countyVaccCollection, weeklyCasesDeathsCollection;
let db; // Add the db object here

// This function needs to be called after the MongoDB client connects
// to make the collections available to these routes.
function setCollections(collections) {
    db = collections.db; // Get the db object
    confirmedCollection = collections.confirmed;
    deathsCollection = collections.deaths;
    popCollection = collections.pop;
    vaccCollection = collections.vaccine;
    countyVaccCollection = collections.countyVacc;
    weeklyCasesDeathsCollection = collections.weeklyCasesDeaths;
}

// =======================================================
// Test Routes for Database Inspection
// =======================================================

// A simple route to check if the database connection is active
router.get('/api/test/connection', (req, res) => {
  if (confirmedCollection && deathsCollection) {
    res.send({ status: "ok", message: "Database collections are ready." });
  } else {
    res.status(503).send({ status: "error", message: "Database connection not established yet." });
  }
});

// Get a count of all documents in the specified collection
router.get('/api/test/count/:collectionName', async (req, res) => {
  const collectionName = req.params.collectionName;
  let collection;
  
  switch (collectionName) {
    case 'confirmed': collection = confirmedCollection; break;
    case 'deaths': collection = deathsCollection; break;
    case 'population': collection = popCollection; break;
    case 'vaccine': collection = vaccCollection; break;
    case 'countyVaccine': collection = countyVaccCollection; break;
    case 'weekly': collection = weeklyCasesDeathsCollection; break;
    default:
      return res.status(400).send({ error: "Invalid collection name." });
  }

  try {
    const count = await collection.countDocuments();
    res.send({ collection: collectionName, count: count });
  } catch (err) {
    logger.error(`Error getting document count for ${collectionName}: ${err}`);
    res.status(500).send({ error: "Failed to get document count." });
  }
});

// Get a single, random document from a collection to inspect its structure
router.get('/api/test/document/:collectionName', async (req, res) => {
  const collectionName = req.params.collectionName;
  let collection;
  
  switch (collectionName) {
    case 'confirmed': collection = confirmedCollection; break;
    case 'deaths': collection = deathsCollection; break;
    case 'population': collection = popCollection; break;
    case 'vaccine': collection = vaccCollection; break;
    case 'countyVaccine': collection = countyVaccCollection; break;
    case 'weekly': collection = weeklyCasesDeathsCollection; break;
    default:
      return res.status(400).send({ error: "Invalid collection name." });
  }

  try {
    const randomDocument = await collection.findOne();
    if (randomDocument) {
      res.send(randomDocument);
    } else {
      res.status(404).send({ error: "No documents found in this collection." });
    }
  } catch (err) {
    logger.error(`Error fetching random document from ${collectionName}: ${err}`);
    res.status(500).send({ error: "Failed to fetch document." });
  }
});

// Get the latest CDC weekly case/death record for a specific state
router.get('/api/test/weekly_data', async (req, res) => {
    const state = req.query.state || "NY"; // Default to NY for testing
    try {
        const latestRecord = await weeklyCasesDeathsCollection.find({ "state": state }).sort({ "end_date": -1 }).limit(1).toArray();
        if (latestRecord.length > 0) {
            res.send(latestRecord[0]);
        } else {
            res.status(404).send({ error: "No weekly data found for this state." });
        }
    } catch (err) {
        logger.error(`Error fetching latest weekly data: ${err}`);
        res.status(500).send({ error: "Failed to fetch weekly data." });
    }
});

// Get a list of all collection names in the database
router.get('/api/test/collections', async (req, res) => {
  if (!db) {
    return res.status(503).send({ status: "error", message: "Database connection not established yet." });
  }
  try {
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    res.send({ collections: collectionNames });
  } catch (err) {
    logger.error(`Error fetching all collection names: ${err}`);
    res.status(500).send({ error: "Failed to fetch collection names." });
  }
});

module.exports = { router, setCollections };
