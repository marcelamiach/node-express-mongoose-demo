'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const { respond } = require('../utils');
const Article = mongoose.model('Article');