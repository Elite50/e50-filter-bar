var app = angular.module('app', ['e50Table', 'e50FilterBar']);
app.controller('MainCtrl', function($scope, E50Filter) {
  
  $scope.people = [
    {name: "A Person", age: 13, distributed: true},
    {name: "B Person", age: 274},
    {name: "C Person", age: 3564565, distributed: true},
    {name: "D Person", age: 230},
    {name: "E Person", age: 346, distributed: true}
  ];
  
  // New e50 filter
  var filterBar = $scope.filterBar = E50Filter.new();
  
  // setup the views
  filterBar.views.setViews(['Table', 'List', 'Grid', 'Masonry']);
  filterBar.views.setDefault('list');

  // setup the sort dropdown
  filterBar.sort.setOptions([
    ['id', 'Creation Date'],
    ['name', 'Alphabetical'],
    ['age', 'Age']
  ]);
  filterBar.sort.onChange(filterBar.fetch);

  // setup our filters
  filterBar.filter.setOptions([
    ['all', 'All'],
    ['me', 'By Me'],
    ['distribution', 'In Distribution']
  ]);
  filterBar.filter.onChange(filterBar.fetch);

  // setup our actions
  filterBar.actions.setOptions([
    ['',''],
    ['export', 'Export'],
    ['download', 'Download'],
  ]);
  filterBar.actions.setKey('');
  filterBar.actions.onChange(function(value) {
    // perform specified action
  });

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