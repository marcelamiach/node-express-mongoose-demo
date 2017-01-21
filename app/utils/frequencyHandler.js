function FrequencyHandler() {
  //setting unwanted words
  var unwantedWords = ["a", "an", "and", "the", "is", "To", "Of", "in", "on", "at", "with", "into", "for", "by"];
  var listSize = 10;
  
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