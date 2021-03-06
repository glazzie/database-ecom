const express = require('express');
const app = express();
const cors = require('cors')
const passport = require('passport')

// getting the local authentication type



require('./authentication/passport')(passport)
const productController = require('./controllers/productController');
const userController = require('./controllers/userController');
const orderController = require('./controllers/orderController');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/products', productController);
app.use('/api/users', userController);
app.use('/api/orders', orderController);

module.exports = app;