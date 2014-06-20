'use strict';

var RepoActions = {
  refreshAllRepos: function() {
    this.dispatch('REPOS_REFRESH_ALL');
  }
};

module.exports = RepoActions;