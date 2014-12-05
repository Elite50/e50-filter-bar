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
