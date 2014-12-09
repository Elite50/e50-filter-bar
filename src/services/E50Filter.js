angular.module('e50FilterBar')
.factory('E50Filter', function(E50Dropdown, E50Count, E50Views, E50Search) {
  
  function E50Filter(options, override) {

    // Setup options
    this.options = {
      count: true,
      filters: true,
      views: true,
      sort: true,
      search: true,
      actions: true
    };

    // Override options
    angular.extend(this.options, options);

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
        asc: false,
        ascLabel: 'ASC',
        reverse: function() {
          this.asc = !this.asc;
          this.ascLabel = this.asc ? 'DSC' : 'ASC';
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
    // if you passed in fetchParams into an e50-table
    this.fetch = function() {
      this.fetchParams = {
        sort: this.sort.key,
        filter: this.filter.key,
        q: this.search.text
      };
    }.bind(this);

    // Get the sortBy key
    this.sortKey = function() {
      return this.sort.key.value || this.sort.key;
    };

    // Get the filter key
    this.filterKey = function() {
      return this.filter.key.value;
    };

    // Get the sorting direction
    this.asc = function() {
      return this.sort.asc;
    };

    // init data object
    this.data = {};

    // Extend/override if necessary
    angular.extend(this, override);
  }

  // Expose constructor
  return {
    new: function(data) {
      return new E50Filter(data);
    }
  }
});