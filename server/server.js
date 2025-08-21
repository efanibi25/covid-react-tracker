// express
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const corsOptions = {
  origin: ['http://135.181.38.103:5400', 'http://covid.fanibi.org'],
};

// Middleware
app.use(bodyParser.json());
// Using permissive CORS for now, you can switch to cors(corsOptions) for production
app.use(cors());

const port = process.env.PORT || 5400;

// ==========================================================
// MongoDB Connection & Route Initialization
// ==========================================================
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'covid';
const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect(function(err, client) {
  if (err) {
    console.error(`Failed to connect to Mongo: ${err.message}`);
    return;
  }
  console.log("Connected correctly to Covid Database");
  const db = client.db(dbName);
  
  // Define the collections object for the controllers
  const collections = {
    covid_confirmed_usafacts: db.collection('covid_confirmed_usafacts'),
    covid_deaths_usafacts: db.collection('covid_deaths_usafacts'),
    population: db.collection('population'),
    vaccine: db.collection('vaccine'),
    weekly_cases_deaths: db.collection('weekly_cases_deaths'),
  };

  // --- Import and initialize your routers ---

  // 1. Import your new, refactored routers
  const { router: countyRouter, setCollections: setCountyCollections } = require('./routes/countyRoutes.js');
  const { router: stateRouter, setCollections: setStateCollections } = require('./routes/stateRoutes.js');
  
  // 2. Import your other existing routers
  const { router: newsRouter } = require('./routes/newsRoutes.js');
  const { router: testRouter, setCollections: setTestCollections } = require('./routes/testRoutes.js');
  
  // 3. Set the collections for each router that needs them
  setCountyCollections(collections);
  setStateCollections(collections);
  setTestCollections(collections);

  // 4. Use all the routers in your Express app
  app.use('/api', countyRouter);
  app.use('/api', stateRouter);
  app.use('/api', newsRouter);
  app.use('/api/test', testRouter);
  
  console.log("Attempting to start server...");

  // NEW: Store the result of app.listen in a 'server' variable
  const server = app.listen(port, () => console.log(`Listening on port ${port}`));

  // NEW: Add this code block to handle the shutdown signal (Ctrl+C)
  process.on('SIGINT', () => {
    console.log('\nCaught interrupt signal, shutting down gracefully...');
    
    server.close(() => {
      console.log('HTTP server closed.');
      
      client.close(false, () => {
        console.log('Mongo connection closed.');
        process.exit(0);
      });
    });
  });
});