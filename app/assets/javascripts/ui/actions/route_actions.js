'use strict';

var RouteActions = {
  initRouter: function() {
    this.dispatch('ROUTER_INIT');
  },
  rootRouteMatch: function() {
    this.dispatch('ROUTER_MATCH_ROOT');
  },
  reposRouteMatch: function(org) {
    this.dispatch('ROUTER_MATCH_REPOS', org);
  },
  navigateTo: function(path) {
    this.dispatch('ROUTER_NAVIGATE_TO', path);
  }
};

module.exports = RouteActions;