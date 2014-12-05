angular.module('e50FilterBar')
.factory('E50Search', function(E50Toggle) {

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
});