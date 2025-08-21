// routes/countyRoutes.js

const express = require('express');
const router = express.Router();
const countyController = require('../controllers/countyController.js');

// The setCollections function is now passed directly to the controller
const setCollections = countyController.setCollections;

// ==========================================================
// API Routes for County Data
// ==========================================================
// Each route simply points to a function in the controller

router.get('/county_cases', countyController.getCountyCases);
router.get('/county_deaths', countyController.getCountyDeaths);
router.get('/county_pop', countyController.getCountyPop);
router.get('/county_vacc', countyController.getCountyVacc);
router.get('/latest_county_cases', countyController.getLatestCountyCases);
router.get('/latest_county_deaths', countyController.getLatestCountyDeaths);
router.get('/latest_county_vacc', countyController.getLatestCountyVacc);

module.exports = { router, setCollections };