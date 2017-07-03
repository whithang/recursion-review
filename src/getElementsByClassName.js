// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
) {
  var doc;
  var element = [];
  var nodeArray = [];
  if (arguments.length === 1){
    doc = document.body;
  } else {
    doc = arguments[1];
  }
  if (doc.classList){
    if (doc.classList.contains(className)){
      element.push(doc);
      nodeArray = nodeArray.concat(element);
    } 
  } 
  if (doc.hasChildNodes()){
    var children = doc.childNodes;
    for (var i = 0; i<children.length; i++){
      element = getElementsByClassName(className, children[i]);     
      nodeArray = nodeArray.concat(element);
    }
  } 
  if (nodeArray === []){
    return;
  } else {
    return  nodeArray;
  }
};
