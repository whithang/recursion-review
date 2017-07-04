// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  var test = json;
  var position = 0;

  var parseArray = function(substring) {
    var result = [];
    for (var i = 0; i < substring.length; i++) {
      if (substring[i] === ']') {
        position += i;
        return result;
      } else if (substring[i] === ',') {
        result.push(parseNextChar(substring.slice(i + 1)));
      } else {
        result.push(parseNextChar(substring.slice(i)));
      }
    }
  };

  var parseObject = function(substring) {
    var result = {};
    var hasKey = false;
    var key;
    for (var i = 0; i < substring.length; i++) {
      if (substring[i] === '}') {
        position += i;
        return result;
      } else if (hasKey === false) {
        key = parseNextChar(substring.slice(i));
        i += key.length;
        hasKey = true;
      } else if (hasKey === true && substring[i] === ':') {
        result[key] = parseNextChar(substring.slice(i + 1)); 
        hasKey = false;
      } 
    }
  };
  var parseString = function(substring) {
    var result = '';
    for (var i = 0; i < substring.length; i++) {
      if (substring[i] === '"') {
        position += i;
        return result;
      } else {
        result += substring[i];
      }
    }
  };  

  var parseNextChar = function(substring) {
    for (var i = 0; i < substring.length; i++) {
      position++;
      if (substring[i] === '[') {
        return parseArray(substring.slice(i + 1));
      } else if (substring[i] === '{') {
        return parseObject(substring.slice(i + 1));
      } else if (substring[i] === '"') {
        return parseString(substring.slice(i + 1));
      }
    }
  };

  return parseNextChar(json);
};
