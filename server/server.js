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

// app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '../dist')));
const lisa = createProxyMiddleware({ target: 'http://ec2-13-57-221-22.us-west-1.compute.amazonaws.com', changeOrigin:true});
const eduardo = createProxyMiddleware({ target:'http://ec2-54-183-193-8.us-west-1.compute.amazonaws.com', changeOrigin:true});
const max = createProxyMiddleware({target: 'http://ec2-52-53-212-33.us-west-1.compute.amazonaws.com/bundle.js', changeOrigin:true});

app.use('/lisa',lisa);
app.use('/ed',eduardo);
app.use('/max', max);
// app.use('/', createProxyMiddleware({
//   target: 'http://ec2-13-57-221-22.us-west-1.compute.amazonaws.com',
//   // target:['http://ec2-13-52-220-253.us-west-1.compute.amazonaws.com', 'http://ec2-54-67-54-160.us-west-1.compute.amazonaws.com/','http://ec2-54-183-54-127.us-west-1.compute.amazonaws.com'],
//   // load balancer url for lisa
//   changeOrigin:true,
//   router: {
//     'localhost:4500': 'http://ec2-54-67-54-160.us-west-1.compute.amazonaws.com',
//     'localhost:4500': 'http://ec2-54-183-54-127.us-west-1.compute.amazonaws.com',
//   },
// },))
// app.use('/ed', createProxyMiddleware({
//   target:'http://ec2-54-67-54-160.us-west-1.compute.amazonaws.com/',
//   //load balancer url for eduardo
//   changeOrigin:true,
// },))
// app.use('/max', createProxyMiddleware({
//   target:'http://ec2-54-183-54-127.us-west-1.compute.amazonaws.com',
//   // load balancer url for me
//   changeOrigin:true,
// },))

// app.get('*', (req, res) => {
//   res.render(path.join(__dirname, '../dist/index.pug'));
//   // res.status(200);
// })

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`)
})