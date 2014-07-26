'use strict';

var Fluxxor = require('fluxxor');
var update = require('react/lib/update');
var emptyObj = require('react/lib/emptyObject');

var GH = new Octokat({
  token: window.TOKEN
});

function handleRepoRetrieval(store) {
  return function(result) {
    store.repos = update(store.repos, {
      $push: result
    });
    store.emit('change');

    if(result.nextPage) {
      result.nextPage().then(handleRepoRetrieval(store));
    }
  }
}

var RepoStore = Fluxxor.createStore({
  actions: {
    ROUTER_MATCH_REPOS: 'fetchRepos'
  },
  initialize: function() {
    this.repos = [];
    this.repo = emptyObj;
  },
  fetchRepos: function() {
    var store = this;
    store.waitFor(['OrgStore'], function(orgStore) {
      var action;
      var org = orgStore.getState().current;
      store.repos = [];
      if(org.id === -1) {
        action = GH.me.repos.fetch();
      } else {
        action = GH.orgs(org.login).repos.fetch();
      }
      action.then(handleRepoRetrieval(store));
    });
  },
  getState: function() {
    return {
      all: this.repos
    }
  }
});

module.exports = RepoStore;