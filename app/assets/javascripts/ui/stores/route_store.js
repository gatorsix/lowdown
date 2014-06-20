'use strict';

var Fluxxor = require('fluxxor');
var director = require('director');
var emptyObj = require('react/lib/emptyObject');

var RouteStore = Fluxxor.createStore({
  actions: {
    ROUTER_INIT: 'initRouter',
    ORGS_SEED: 'handleOrgsSeed',
    ROUTER_MATCH_ROOT: 'redirectToDefaultOrg',
    ROUTER_NAVIGATE_TO: 'handleNavigateTo'
  },
  initialize: function() {
    var routes = {
      '/': this.__root,
      '/orgs/:org/repos': this.__repos
    };

    var router = new director.Router(routes)
      .configure({ html5history:true });

    this.router = router;
    this.route = [];
    this.__defaultOrg = null;
  },
  getState: function() {
    return {
      route: this.route,
      path: this.path
    }
  },
  initRouter: function() {
    this.router.init();
    this.route = this.router.getRoute();
    this.path = this.router.getPath();
    this.emit('change');
  },
  handleOrgsSeed: function(payload) {
    this.__defaultOrg = payload.defaultOrg;
  },
  redirectToDefaultOrg: function(org) {
    var store = this;
    if('/' !== store.path) return;
    org = org || store.__defaultOrg;
    store.waitFor(['OrgStore'], function() {
      var defaultOrg = org.login;
      var path = '/orgs/'+defaultOrg+'/repos';

      // TODO: this should "replace state"
      store.router.setRoute(path);
    });
  },
  handleNavigateTo: function(path) {
    this.router.setRoute(path);
  },
  __updateState: function() {
    this.path = this.router.getPath();
    this.route = this.router.getRoute();
    this.emit('change');
  },
  __root: function() {
    var store = this;
    store.__updateState();
    // Fluxxor doesn't want to trigger an action while processing another,
    // so let's call it asynchronously.
    window.requestAnimationFrame(function() {
      store.flux.actions.rootRouteMatch();
    });
  },
  __repos: function(orgName) {
    var store = this;
    store.__updateState();
    // Fluxxor doesn't want to trigger an action while processing another,
    // so let's call it asynchronously.
    window.requestAnimationFrame(function() {
      store.flux.actions.reposRouteMatch(orgName);
    });
  }
});

module.exports = RouteStore;