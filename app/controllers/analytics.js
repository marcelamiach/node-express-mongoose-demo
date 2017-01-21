'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const { respond } = require('../utils');
const Article = mongoose.model('Article');

var Handler = require('../utils/frequencyHandler.js');

function orderByTag(frequencies) {
  return frequencies.sort(function(a, b) {
    var firstTag = a.tag.toLowerCase(), secondTag = b.tag.toLowerCase();
      if (firstTag < secondTag)
          return -1 
      if (firstTag > secondTag)
          return 1
      return 0
  });
}
