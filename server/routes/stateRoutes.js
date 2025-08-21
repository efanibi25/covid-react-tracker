// routes/stateRoutes.js

const express = require('express');
const router = express.Router();
const stateController = require('../controllers/stateController.js');

const setCollections = stateController.setCollections;

// ==========================================================
// API Routes for State Data
// ==========================================================
router.get('/all_states', stateController.getAllStates);
router.get('/state_data', stateController.getStateData);
router.get('/state_vacc', stateController.getStateVacc);
router.get('/state_data_aggregated', stateController.getAggregatedStateData);
router.get('/latest_state_vacc', stateController.getLatestStateVacc);
router.get('/state_pop', stateController.getStatePop);

module.exports = { router, setCollections };