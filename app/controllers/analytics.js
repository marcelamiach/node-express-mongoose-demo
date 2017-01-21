'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const { respond } = require('../utils');
const Article = mongoose.model('Article');

var Handler = require('../utils/frequencyHandler.js');

/**
 * Show analytics
 */

exports.index = async(function* (req, res) {
  
  //finding tags
  userTags().then(function(allTags) {
    getTopTenWordFrequencies(allTags).then(function(frequencies) {
      
      respond(res, 'analytics/index', {
        title: 'Analytics',
        tags: frequencies
      });
      
    }, function(error) {
      console.log(error);
      renderError(res);
    });
  }, function(error) {
    console.log(error);
    renderError(res);
  });
});

function renderError(res) {
  return respond(res, 'analytics/index', {
      title: 'Analytics',
      tags: undefined
    });
}

function userTags() {
  return new Promise(function(resolve, reject) {
    var allTags = [];
    const criteria = { };
    const options = {
      criteria: criteria
    };
    
    Article.listAll(options)
    .then(function(articles) {

      articles.forEach(function(article) {
        var articlesTags = article.tags.split(",");

        articlesTags.forEach(function(tag) {
          if (!(allTags.indexOf(tag) > -1)) {
            allTags.push(tag);
          }
        });
      });
      resolve(allTags);
    }, function(error) {
      console.log("ERROR - tags");
      reject(error);
    });
  });
}

function getTopTenWordFrequencies(tags) {
  return new Promise(function(resolve, reject) {
    var frequencies = [];
    var responsesReceived = 0;
    var frequencyHandler = new Handler();
    
    tags.forEach(function(tag) {
      const criteria = { tags: tag };
      const options = {
        criteria: criteria
      };
      
      //here, it's important to be sure that all queries completed successfully (because of asynchronous behavior) before continuing
      Article.listAll(options).then(function(articles) {
        responsesReceived += 1;
    
           var fullText = articles.map(function(article) { 
             return article.body
           }).join(" ");
           
           frequencies.push({ tag: tag, frequencies: frequencyHandler.getFrequency(fullText) });
      
           if (responsesReceived == tags.length) {
             //ordering alhpabetically by tag
             frequencies = orderByTag(frequencies);
    
             resolve(frequencies); 
           }
       }, function(error) {
         console.log("ERROR - frequencies");
         reject(error);
       });
    });
  });
}

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
