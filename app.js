var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressLayout = require("express-ejs-layouts");
const cors = require("cors");
const connectDB = require("./app_api/models/db");


const indexRouter = require('./app_server/routes/index');
const beritaRouterApi = require("./app_api/routes/berita"); 
const kategoriRouterApi = require("./app_api/routes/kategori");
const penulisRouterApi = require("./app_api/routes/penulis");
const sumberRouterApi = require("./app_api/routes/sumber");

const authRouterApi = require("./app_api/routes/auth");

require("dotenv").config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, "app_server", 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayout);
app.use(cors());

app.use('/', indexRouter);



app.use("/api/berita", beritaRouterApi);
app.use("/api/kategori", kategoriRouterApi);
app.use("/api/penulis", penulisRouterApi);
app.use("/api/sumber", sumberRouterApi);

app.use("/api/auth", authRouterApi);

// connect to mongoDB
connectDB();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
