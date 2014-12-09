var app = angular.module('app', ['e50FilterBar']);
app.controller('MainCtrl', function($scope, filterBar) {
  
  $scope.people = [
    {name: "A Person", age: 13, distributed: true},
    {name: "B Person", age: 274},
    {name: "C Person", age: 3564565, distributed: true},
    {name: "D Person", age: 230},
    {name: "E Person", age: 346, distributed: true}
  ];

  // Pass this into the e50-filter-bar directive
  var filterBar = $scope.filterBar = filterBar;

  $scope.filterFn = function(v) {
    switch(filterBar.filter.getKey()) {
      case "distribution":
        return v.distributed;
      case "me":
        return v.name === "A Person";
      default:
        return true;
    }
  };

  $scope.searchFn = function(v) {
    if(!filter.search.open){ return true; }
    var hasSearch = false;
    Object.keys(v).forEach(function(key) {
      var item = v[key];
      var i = item.indexOf(filterBar.search.text);
      if(!hasSearch && i !== -1) {
        hasSearch = true;
      }
    });
    return true;
  };

  $scope.addPerson = function() {
    $scope.people.push({
      name: "Person",
      age: 20 + $scope.people.length
    });
  };
});