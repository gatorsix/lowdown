'use strict';

var Fluxxor = require('fluxxor');
var _ = require('lodash');
var emptyObj = require('react/lib/emptyObject');
var OrgActions = require('../actions/org_actions');

var gh = new Octokat({
  token: window.TOKEN
});

var OrgStore = Fluxxor.createStore({
  actions: {
    ORGS_FETCH_ALL: 'fetchAllOrgs'
  },
  initialize: function() {
    this.orgs = [];
    this.current = emptyObj;
  },
  fetchAllOrgs: function() {
    var store = this;
    gh.me.orgs.fetch().then(function(orgs) {
      store.orgs = orgs;
      store.emit('change');
    });
  },
  getState: function() {
    return {
      all: this.orgs,
      current: this.current
    }
  }
});

module.exports = OrgStore;