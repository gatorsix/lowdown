'use strict';

var GithubUserActions = {
  fetchCurrentUser: function(user) {
    return this.dispatch('GH_USER_FETCH_CURRENT');
  }
};

module.exports = GithubUserActions;