require('dotenv');
require('newrelic');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// app.use(express.static(path.join(__dirname, '../dist')))

app.get('/', (req, res) => {
  res.send('Working...')
  // res.status(200);
})

app.use('/',createProxyMiddleware({
  target:'http://ec2-13-52-220-253.us-west-1.compute.amazonaws.com',
  // load balancer url for lisa
  changeOrigin:true,
},))
app.use('/',createProxyMiddleware({
  target:'http://ec2-54-67-54-160.us-west-1.compute.amazonaws.com/',
  //load balancer url for eduardo
  changeOrigin:true,
},))
app.use('/',createProxyMiddleware({
  target:'http://ec2-54-183-54-127.us-west-1.compute.amazonaws.com',
  // load balancer url for me
  changeOrigin:true,
},))


const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`)
})