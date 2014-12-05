angular.module('e50Filter.tpls', ['tpl/e50-filter-tpl.html']);

angular.module("tpl/e50-filter-tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("tpl/e50-filter-tpl.html",
    "<div>\n" +
    "  <div ng-if=\"bar.options.count\">{{bar.getCount() || bar.data.length}} {{options.listLabel || 'Results'}}</div>\n" +
    "  \n" +
    "  <div ng-if=\"bar.options.filters\">\n" +
    "    <select ng-model=\"bar.filter.key\" ng-change=\"bar.filter.onchange()\" ng-options=\"item[0] as item[1] for item in bar.filter.options\" ng-if=\"bar.filter.hasOptions()\"></select>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-if=\"bar.options.views\">\n" +
    "    <a href=\"\" ng-repeat=\"view in bar.views.options\" ng-click=\"bar.views.setView(view)\">{{view}}</a>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-if=\"bar.options.sort\">\n" +
    "    <select ng-model=\"bar.sort.key\" ng-change=\"bar.sort.onchange()\" ng-options=\"item[0] as item[1] for item in bar.sort.options\" ng-if=\"bar.sort.hasOptions()\">\n" +
    "    </select>\n" +
    "    <a href=\"\" ng-click=\"bar.sort.reverse()\">flip</a>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div ng-if=\"bar.options.search\">\n" +
    "    <a href=\"\" ng-click=\"bar.search.toggle()\">toggle search</a>\n" +
    "    <input type=\"text\" placeholder=\"Filter search\" ng-if=\"bar.search.isOpen()\" ng-model=\"bar.search.text\">\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-if=\"bar.options.actions\">\n" +
    "    <select ng-model=\"bar.actions.key\" ng-change=\"bar.actions.onchange()\" ng-options=\"item[0] as item[1] for item in bar.actions.options\" ng-if=\"bar.actions.hasOptions()\"></select>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module('e50FilterBar', ['e50Filter.tpls']);
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
    templateUrl: 'tpl/e50-filter-tpl.html'
  };
});
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
angular.module('e50FilterBar')
.factory('E50Dropdown', ["E50Toggle", function(E50Toggle) {
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
}]);
angular.module('e50FilterBar')
.factory('E50Filter', ["E50Dropdown", "E50Count", "E50Views", "E50Search", function(E50Dropdown, E50Count, E50Views, E50Search) {
  
  function E50Filter(override) {

    // Setup options
    this.options = {
      count: true,
      filters: true,
      views: true,
      sort: true,
      search: true,
      actions: true
    };

    // Override
    angular.extend(this.options, override);

    // Result count
    if(this.options.count) {
      this.count = E50Count.new();
    }

    // Filter dropdown
    if(this.options.filters) {
      this.filter = E50Dropdown.new({
        key: 'all'
      });
    }

    // Views toggle
    if(this.options.views) {
      this.views = E50Views.new();    
    }
    
    // Sort dropdown
    if(this.options.sort) {
      this.sort = E50Dropdown.new({
        key: 'name',
        _reverse: false,
        reverse: function() {
          this._reverse = !this._reverse;
        }
      });
    }

    // Action functionality
    if(this.options.actions) {
      this.actions = E50Dropdown.new();
    }

    // Search functionality
    if(this.options.search) {
      this.search = E50Search.new({
        text: "",
        placeholder: "Search"
      });
    }

    // Set the fetch params, which will trigger a request to the server
    this.fetch = function() {
      this.fetchParams = {
        sort: this.sort.key,
        filter: this.filter.key,
        q: this.search.text
      };
    }.bind(this);
  }

  return {
    new: function(data) {
      return new E50Filter(data);
    }
  }
}]);
angular.module('e50FilterBar')
.factory('E50Search', ["E50Toggle", function(E50Toggle) {

  // Filter bar search functionality
  function Search(override) {
    
    // Mixin toggle functionality
    angular.extend(this, E50Toggle);

    // Set the default text field
    this.text = "";

    // Set the default placeholder
    this.placeholder = "Search";

    // Set placeholder text
    setPlaceholder = function(placeholder) {
      this.placeholder = placeholder;
    };
    
    // Extend/Override
    angular.extend(this, override);
  }

  // Indirectly expose the constructor
  return {
    new: function(override) {
      return new Search(override);
    }
  };
}]);
angular.module('e50FilterBar')
.factory('E50Toggle', function() {
  // Use as a mixin
  return {
    // Set the default open state
    _open: false,

    // Checks open state
    isOpen: function() {
      return this._open;
    },

    // Sets the state to open
    open: function() {
      this._open = true;
    },

    // Sets the state to closed
    close: function() {
      this._open = false
    },

    // Toggles the state
    toggle: function() {
      this._open = !this._open;
    }
  };
});
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