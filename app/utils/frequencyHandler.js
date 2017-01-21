function FrequencyHandler() {
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