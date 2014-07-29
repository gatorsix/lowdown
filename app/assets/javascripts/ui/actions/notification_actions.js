'use strict';

var NotiActions = {
  fetchRepoNotifications: function(owner, repoName) {
    return this.dispatch('NOTIFICATIONS_FETCH_REPO', { owner:owner, repoName:repoName });
  }
};

module.exports = NotiActions;