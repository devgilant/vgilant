  //var _ = require('lodash');
//var async = require('async');
//var crypto = require('crypto');
//var nodemailer = require('nodemailer');
//var passport = require('passport');
var DataType = require('../models/DataType');
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
exports.getRESTDataTypes = function(req, res) {
  if (!req.user) {
    return res.redirect('/');
  }
  else
  {
    DataType.find({}, function(err, dataTypes){
      if (err)
        respondWithError(res, err);
      else
        res.json(dataTypes);
    });
  }
};

/**
 * POST /rest/services
 * Post a new service with name, type (out of enum) and a collection of data fields.
 */
exports.postRESTDataTypes = function(req, res) {
  var dataType = new DataType();
  dataType.name = req.body.name;
  dataType.type = req.body.type; // need to validate with enum
  dataType.save(function(err) {
      if (err)
        respondWithError(res, err);
      else
        res.json({ message: 'Data type created!' });
  });
}