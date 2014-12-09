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
      bar: "=filter"
    },
    templateUrl: 'views/components/e50-filter-bar.tpl.html'
  };
});