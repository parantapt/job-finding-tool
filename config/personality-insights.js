'use strict';

// Module dependencies
var express = require('express'),
  bluemix = require('./bluemix'),
  watson = require('watson-developer-cloud'),
  extend = require('util')._extend;


var pi_credentials = extend({
	version: 'v2',
	url: "https://gateway-s.watsonplatform.net/personality-insights/api",
	username: "f6fe0c12-fb84-41a5-8f19-50032d6cad29",
	password: "QHGtHD142ZhU"
}, bluemix.getServiceCreds('personality_insights_pstg')); // VCAP_SERVICES

// Create the service wrapper
var personalityInsights = new watson.personality_insights(pi_credentials);

module.exports = function (app) {

  	app.post('/pi/', function(req, res) {
	  personalityInsights.profile(req.body, function(err, profile) {
		if (err) {
		  if (err.message){
			err = { error: err.message };
		  }
		  return res.status(err.code || 500).json(err || 'Error processing the request');
		}
		else
		  return res.json(profile);
	  });
	});

};