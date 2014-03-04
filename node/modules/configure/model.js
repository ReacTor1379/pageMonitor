'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * configure Schema
 */
var addSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
});

mongoose.model('address', addSchema);

/**
 * configure Schema
 */
var confSchema = new Schema({
    settings: {
        type: String,
        required: true,
        trim: true
    }
});

mongoose.model('configure', confSchema);