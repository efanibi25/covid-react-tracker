//express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5000;
const database = require('./paths/database.js')
app.use(database)
const news = require('./paths/news.js')
app.use(news)
app.listen(port, () => console.log(`Listening on port ${port}`));
