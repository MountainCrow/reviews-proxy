require('dotenv');
require('newrelic');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, '../dist')))

app.get('/', (req, res) => {
  res.send('Working...')
})

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`)
})