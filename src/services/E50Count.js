angular.module('e50FilterBar')
.factory('E50Count', function() {

  // Filter bar count functionality
  function Count(override) {
    this.value = 0;
    this.label = "Results";
  };

  // Indirectly expose constructor
  return {
    new: function(override) {
      return new Count(override);
    }
  };
});