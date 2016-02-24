vgilantApp.factory('sharedDataService', function() {
 var savedData = {}
 function set(key, value) {
   savedData[key] = value;
 }
 function get(key) {
  return savedData[key];
 }

 return {
  set: set,
  get: get
 }

});