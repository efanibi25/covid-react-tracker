// controllers/testController.js

const logger = require('../logger');

let db, collections = {};

// Function to inject the database handles from your main server file
function setCollections(dbCollections) {
  db = dbCollections.db;
  collections = dbCollections;
  logger.debug('Test controller has received database collections.');
}

// A robust health check that pings the database directly
const healthCheck = async (req, res) => {
  if (!db) {
    return res.status(503).send({ status: "error", message: "Database connection has not been established." });
  }
  try {
    await db.admin().ping();
    res.send({ status: "ok", message: "Database connection is active." });
  } catch (err) {
    logger.error('Database ping failed:', err);
    res.status(503).send({ status: "error", message: "Cannot connect to the database.", error: err.message });
  }
};

// Get a list of all collection names in the database
const getAllCollections = async (req, res) => {
  if (!db) {
    return res.status(503).send({ status: "error", message: "Database connection not established yet." });
  }
  try {
    const collectionsList = await db.listCollections().toArray();
    const collectionNames = collectionsList.map(col => col.name);
    res.send({ collections: collectionNames });
  } catch (err) {
    logger.error('Error fetching all collection names:', err);
    res.status(500).send({ error: "Failed to fetch collection names." });
  }
};

// Get a count of all documents in the specified collection
const getCollectionCount = async (req, res) => {
  const { collectionName } = req.params;
  const collection = collections[collectionName];

  if (!collection) {
    return res.status(404).send({ error: `Collection '${collectionName}' not found or is not initialized.` });
  }

  try {
    const count = await collection.countDocuments();
    res.send({ collection: collectionName, count: count });
  } catch (err) {
    logger.error(`Error getting document count for ${collectionName}:`, err);
    res.status(500).send({ error: "Failed to get document count." });
  }
};

// Find a single document to test basic data retrieval
const findOne = async (req, res) => {
  const { collectionName } = req.params;
  const collection = collections[collectionName];
  logger.debug(`[Test API] Received request for findOne in '${collectionName}'`);

  if (!collection) {
    return res.status(404).send({ error: `Collection '${collectionName}' not found.` });
  }

  try {
    logger.debug(`[Test API] Executing findOne() on '${collectionName}'`);
    const document = await collection.findOne({}); // Find any document

    if (document) {
      logger.info(`[Test API] Successfully found a document in '${collectionName}'.`);
      res.send(document);
    } else {
      logger.warn(`[Test API] No documents found in '${collectionName}'.`);
      res.status(404).send({ message: "No documents found in this collection." });
    }
  } catch (err) {
    logger.error(`[Test API] Error during findOne on '${collectionName}':`, err);
    res.status(500).send({ error: "Failed to execute findOne." });
  }
};

// Check the fields of a document to diagnose schema mismatches
const checkFields = async (req, res) => {
  const { collectionName } = req.params;
  const collection = collections[collectionName];
  logger.debug(`[Test API] Received request to check fields in '${collectionName}'`);

  if (!collection) {
    return res.status(404).send({ error: `Collection '${collectionName}' not found.` });
  }

  try {
    const document = await collection.findOne({});
    if (document) {
      const fields = Object.keys(document);
      logger.info(`[Test API] Fields for '${collectionName}': ${fields.join(', ')}`);
      res.send({ collection: collectionName, fields: fields });
    } else {
      res.status(404).send({ message: "No documents found to check fields." });
    }
  } catch (err) {
    logger.error(`[Test API] Error during checkFields on '${collectionName}':`, err);
    res.status(500).send({ error: "Failed to execute checkFields." });
  }
};

module.exports = {
  setCollections,
  healthCheck,
  getAllCollections,
  getCollectionCount,
  findOne,
  checkFields,
};