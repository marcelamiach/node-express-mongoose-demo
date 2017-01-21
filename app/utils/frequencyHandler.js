function FrequencyHandler() {
  //setting unwanted words
  var unwantedWords = ["a", "an", "and", "the", "is", "To", "Of", "in", "on", "at", "with", "into", "for", "by"];
  var listSize = 10;
  
  FrequencyHandler.prototype.getFrequency = function(text) {
    var list = [],
        words = text
                .replace(/[']/g, "") //makes words like "I'm" and "You're" one single word
                .replace(/[.,?!;()"-]/g, " ") //removes special characters
                .replace(/\s+/g, " ") //removes double spaces
                .toLowerCase()
                .split(" ") //converts whole combined text to an array of words
                .filter(function(word, index) {
                  return unwantedWords.map(function(unwantedWord) {
                    return unwantedWord.toLowerCase(); //make sure we lower case all words from list
                  }).indexOf(word) == -1;
                }) //removes unwanted words
                .map (function(word) { return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase() }) //capitalizes first letter of each word
      
    //adds new element to list of words and frequency
    words.forEach(function (word) {
      var row = list.filter(function (item) { return item.word == word })[0];
      if (row == undefined) {
        row = { word: word, frequency: 0 };
        list.push(row);
      }
      row.frequency++;
    });
    
    return order(list);
  }
  
  var order = function(list) {
    //ordering by frequencies
    list.sort(function(a, b) {
      return b.frequency - a.frequency;
    });

    //filtering top 10
    list = list.filter(function(element, index) {
      return index <= (listSize - 1);
    });

    return list;
  }
}

module.exports = FrequencyHandler;