

'use strict';

// Module dependencies
var express    = require('express'),
  errorhandler = require('errorhandler'),
  bodyParser   = require('body-parser'),
  session = require('express-session');

module.exports = function (app) {

  // Configure Express
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(session({ secret: 'abzgss123kevinyork' } ));
  app.use(express.query());

  // Setup static public directory
  app.use(express.static(__dirname + '/../public'));
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/../views');

  // Add error handling in dev
  if (!process.env.VCAP_SERVICES) {
    app.use(errorhandler());
  }

};
