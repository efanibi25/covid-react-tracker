const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const logger = require('./logger'); // Use the enhanced logger

// --- Configuration ---
const app = express();
const port = process.env.PORT || 5400;
const url =  process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = 'covid';
const client = new MongoClient(url, { useUnifiedTopology: true });

// --- Middleware ---
app.use(bodyParser.json());
const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [];
const corsOptions = {
  // The origin property can be an array of strings
  origin: allowedOrigins,
  // You can add other CORS options here if needed
  // optionsSuccessStatus: 200 
};
logger.debug("Middleware (bodyParser, cors) has been configured.");

// --- MongoDB Connection & Route Initialization ---
logger.debug("Attempting to connect to MongoDB at:", url);
client.connect(function(err, client) {
  // 1. Initial connection check
  if (err) {
    // Using the logger for the error
    logger.error("FATAL: Failed to establish a network connection to Mongo:", err);
    return;
  }
  logger.info("SUCCESS: Established network connection to Mongo DB.");
  
  // 2. Select the database
  const db = client.db(dbName);
  
  // 3. Verify that the db object is valid
  if (!db || typeof db.collection !== 'function') {
    logger.error("FATAL: The database object is invalid. Check the database name and connection URI.");
    client.close();
    return;
  }
  logger.info(`SUCCESS: Connected to Mongo DB and selected the '${dbName}' database.`);
  
  // 4. Define the collections object for the controllers
  const collections = {
    db: db, // Pass db object for health checks
    covid_confirmed_usafacts: db.collection('covid_confirmed_usafacts'),
    covid_deaths_usafacts: db.collection('covid_deaths_usafacts'),
    population: db.collection('population'),
    vaccine: db.collection('vaccine'),
    weekly_cases_deaths: db.collection('weekly_cases_deaths'),
  };
  logger.debug("Collection handles have been created.");

  // --- Import and initialize your routers ---
  logger.debug("Initializing routers...");
  const { router: countyRouter, setCollections: setCountyCollections } = require('./routes/countyRoutes.js');
  const { router: stateRouter, setCollections: setStateCollections } = require('./routes/stateRoutes.js');
  const { router: newsRouter } = require('./routes/newsRoutes.js');
  const { router: testRouter, setCollections: setTestCollections } = require('./routes/testRoutes.js');
  logger.debug("All router files have been required.");

  // Inject collections into each router
  setCountyCollections(collections);
  logger.debug("Collections injected into countyRouter.");
  setStateCollections(collections);
  logger.debug("Collections injected into stateRouter.");
  setTestCollections(collections);
  logger.debug("Collections injected into testRouter.");

  // Use all the routers in your Express app
  app.use('/api', countyRouter);
  app.use('/api', stateRouter);
  app.use('/api', newsRouter);
  app.use('/api/', testRouter);
  logger.debug("All routers have been attached to the Express app.");
  
  // Start the server
  const server = app.listen(port, () => logger.info(`Server listening on port ${port}`));

  // Graceful shutdown
  process.on('SIGINT', () => {
    logger.info('\nCaught interrupt signal, shutting down gracefully...');
    server.close(() => {
      logger.debug('HTTP server closed.');
      client.close(false, () => {
        logger.info('Mongo connection closed.');
        process.exit(0);
      });
    });
  });
});