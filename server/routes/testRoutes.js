// routes/testRoutes.js

const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

// Define the diagnostic routes
router.get('/health', testController.healthCheck);
router.get('/collections', testController.getAllCollections);
router.get('/count/:collectionName', testController.getCollectionCount);
router.get('/findOne/:collectionName', testController.findOne);
router.get('/checkFields/:collectionName', testController.checkFields);

// Export an object containing both the router and the setCollections function
module.exports = {
  router: router,
  setCollections: testController.setCollections,
};