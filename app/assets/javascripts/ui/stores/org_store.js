'use strict';

var Fluxxor = require('fluxxor');
var _ = require('lodash');
var emptyObj = require('react/lib/emptyObject');
var OrgActions = require('../actions/org_actions');

var OrgStore = Fluxxor.createStore({
  actions: {
    ORGS_SEED: 'handleOrgsSeed',
    ROUTER_MATCH_REPOS: 'handleReposRoute'
  },
  initialize: function() {
    this.orgs = [];
    this.current = emptyObj;
  },
  handleOrgsSeed: function(payload) {
    this.orgs = payload.orgs;
    this.current = payload.defaultOrg;
    this.emit('change');
  },
  handleReposRoute: function(payload) {
    var org = _.find(this.orgs, {login:payload.orgName});
    this.current = org;
    this.emit('change');
  },
  getState: function() {
    return {
      all: this.orgs,
      current: this.current
    }
  }
});

module.exports = OrgStore;