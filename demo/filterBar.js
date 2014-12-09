angular.module('app')
.factory('filterBar', function(E50Filter) {
  // New e50 filter
  var filterBar = E50Filter.new({
    count: true,
    filters: true, 
    views: true,
    sort: true,
    actions: true,
    search: true
  });
  
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

  // Return the configured E50Filter instance
  return filterBar;
})