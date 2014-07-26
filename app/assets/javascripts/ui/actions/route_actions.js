'use strict';

var RouteActions = {
  initRouter: function() {
    this.dispatch('ROUTER_INIT');
  },
  rootRouteMatch: function() {
    this.dispatch('ROUTER_MATCH_ROOT');
  },
  reposRouteMatch: function(orgName) {
    this.dispatch('ROUTER_MATCH_REPOS', orgName);
  },
  navigateTo: function(path) {
    this.dispatch('ROUTER_NAVIGATE_TO', path);
  }
};

module.exports = RouteActions;