  //var _ = require('lodash');
//var async = require('async');
//var crypto = require('crypto');
//var nodemailer = require('nodemailer');
//var passport = require('passport');
var Service = require('../models/Service');
//var path = require('path');

function respondWithError(res, err){
  if (process.env.NODE_ENV != "production") 
    res.status(500).json({ error: err });
  else
    res.status(500).json({ error: 'Errors happen' });
}

/**
 * GET /rest/services
 * Get a json of service documents.
 */
exports.getRESTServices = function(req, res) {
  if (req.user) {
    return res.redirect('/');
  }
  else
  {
    Service.find({}, function(err, services){
      if (err)
        respondWithError(res, err);
      else
        res.json(services);
    });
  }
};

/**
 * POST /rest/services
 * Post a new service with name, type (out of enum) and a collection of data fields.
 */
exports.postRESTServices = function(req, res) {
  var service = new Service();
  console.log(req.body);
  service.name = req.body.name;
  service.category = req.body.category; // need to validate with enum
  // TODO: handle fields
  service.save(function(err) {
      if (err)
        respondWithError(res, err);
      else
        res.json({ message: 'Service created!' });
  });
}