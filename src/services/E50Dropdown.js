angular.module('e50FilterBar')
.factory('E50Dropdown', function(E50Toggle) {
  function Dropdown(override) {

    // Mixin the toggle functionality
    angular.extend(this, E50Toggle);
    
    // Dropdown options
    this.options = [];

    // default key
    this.key = "id";

    // Get the current key
    this.getKey = function() {
      return this.key;
    };

    // Set the current key
    this.setKey = function(key) {
      this.key = key;
    };

    // Populate the options
    this.setOptions = function(options) {
      this.options = options;
    };

    // Checks if there's any options
    this.hasOptions = function() {
      return this.options.length;
    };

    // Sets the on change callback for when the drop down changes
    this.onChange = function(cb) {
      this.onchange = cb;
    };

    // No-op the initial onchange
    this.onchange = angular.noop;

    // Extend/Override
    angular.extend(this, override);
  };

  // Indirectly expose the constructor
  return {
    new : function(override) {
      return new Dropdown(override);
    }
  };
});