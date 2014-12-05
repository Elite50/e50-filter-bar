angular.module('e50FilterBar')
.factory('E50Views', function() {
  function E50Views(override) {
    
    // Default view
    this.view = "table";
    
    // List of views
    this.options = [];

    this.setViews = function(views) {
      this.options = views;
    };

    // Set the current view
    this.setView = function(view) {
      this.view = view.toLowerCase();
    };

    // Checks if the provided view is the current one
    this.isView = function(view) {
      return this.view === view;
    };

    // Gets the current view
    this.getView = function() {
      return this.view;
    };

    // Alias setView
    this.setDefault = this.setView;

    // Extend/Override 
    angular.extend(this, override);
  }

  // Indirectly expose the constructor
  return {
    new: function(override) {
      return new E50Views(override);
    }
  }
});