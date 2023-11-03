var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ordersRouter = require('./routes/orders');
var productsRouter = require('./routes/products'); 
var contactsRouter = require('./routes/contacts');
var webhooksRouter = require('./routes/webhooks');
var invoicesRouter = require('./routes/invoices');

var app = express();
// set the view engine to html
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter); 
app.use('/products', productsRouter);
app.use('/contacts', contactsRouter);
app.use('/webhooks', webhooksRouter);
app.use('/invoices', invoicesRouter);

module.exports = app;