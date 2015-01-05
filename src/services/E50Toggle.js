angular.module('e50FilterBar')
.factory('E50Toggle', function($rootScope, $timeout) {
  // Used as a mixin
  return {
    // Set the default open state
    _open: false,

    // Checks open state
    isOpen: function() {
      return this._open;
    },

    // Checks closed state
    isClosed: function() {
      return !this._open;
    },

    // Sets the state to open
    open: function() {
      this._open = true;
      var self = this;
      $timeout(function() {
        $(document).bind('click.e50-toggle', function() {
          this.close();
          $rootScope.$apply();
          $(document).unbind('click.e50-toggle');
        }.bind(self));
      });      
    },

    // Sets the state to closed
    close: function() {
      this._open = false;
    },

    // Toggles the state
    toggle: function() {
      var action = this._open ? 'close' : 'open';
      this[action]();
    }
  };
});