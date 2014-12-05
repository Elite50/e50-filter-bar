angular.module('e50FilterBar')
.directive('e50FilterBar', function() {
  return {
    restrict: 'EA',
    replace:true,
    priority: 1,
    transclude: true,
    // TODO: determine whether this should be terminal or not
    terminal: true,
    scope: {
      bar: "=filterBar"
    },
    //templateUrl: 'tpl/e50-filter-tpl.html'
    templateUrl: 'views/components/cs-filter-bar.tpl.html'
  };
});