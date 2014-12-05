angular.module('e50FilterBar')
.factory('E50Filter', function(E50Dropdown, E50Count, E50Views, E50Search) {
  
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
});