'use strict';

var RepoActions = {
  fetchAllUserRepos: function() {
    this.dispatch('REPOS_FETCH_ALL_USER');
  },
  fetchAllOrgRepos: function(orgName) {
    this.dispatch('REPOS_FETCH_ALL_ORG', { orgName:orgName });
  }
};

module.exports = RepoActions;