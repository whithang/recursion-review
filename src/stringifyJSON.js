// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // created cases for numbers, null, boolean, strings, arrays, objects
  // numbers - add .toString()
  var typeObj = typeof obj;
  if (typeObj === 'string'){
    return '"' + obj + '"';
  } else if (typeObj === 'number' || typeObj === 'boolean'){
    return obj.toString();
  } else if (obj === null){
    return 'null';
  } else if (Array.isArray(obj)) {
    var result = [];
    for (var i = 0; i<obj.length; i++){
      result.push(stringifyJSON(obj[i]));
    }
    return '[' + result.join(',') + ']';
  } else if (typeObj === 'function' || obj === undefined) {
    return;
  } else {
    var result = [];
    for (var key in obj) {
      var keyString = stringifyJSON(obj[key]);
      if (keyString === undefined) {
        continue;
      }
      result.push(stringifyJSON(key) + ':' + keyString);
    }
    return '{' + result.join(',') + '}';
  }
};
