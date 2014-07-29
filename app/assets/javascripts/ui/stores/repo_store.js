'use strict';

var _ = require('lodash');
var Fluxxor = require('fluxxor');
var update = require('react/lib/update');
var emptyObj = require('react/lib/emptyObject');
var emptyAry = [];

var gh = new Octokat({
  token: window.TOKEN
});

var handleRepoRetrieval = _.curry(function(store, result) {
  store.repos = update(store.repos, {
    $push: result
  });
  store.emit('change');

  if(result.nextPage) {
    result.nextPage().then(handleRepoRetrieval(store));
  }
});

var RepoStore = Fluxxor.createStore({
  actions: {
    REPOS_FETCH_ALL_USER: 'fetchAllUserRepos',
    REPOS_FETCH_ALL_ORG: 'fetchAllOrgRepos'
  },
  initialize: function() {
    this.repos = emptyAry;
    this.current = emptyObj;
  },
  fetchAllUserRepos: function(payload) {
    this.repos = emptyAry;
    gh.me.repos.fetch().then(handleRepoRetrieval(this));
  },
  fetchAllOrgRepos: function(payload) {
    this.repos = emptyAry;
    gh.orgs(payload.orgName).repos.fetch().then(handleRepoRetrieval(this));
  },
  getState: function() {
    return {
      all: this.repos,
      current: this.current
    }
  }
});

module.exports = RepoStore;