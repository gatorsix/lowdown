'use strict';

var Fluxxor = require('fluxxor');
var _ = require('lodash');
var emptyObj = require('react/lib/emptyObject');
var NotiActions = require('../actions/notification_actions');

var NotiStore = Fluxxor.createStore({
  actions: {
    NOTIFICATIONS_FETCH_REPO: 'fetchRepoNotifications'
  },
  initialize: function() {
    this.notifications = [];
    this.current = emptyObj;
  },
  fetchRepoNotifications: function(payload) {
    console.info('fetch repo notifications for ', payload.owner, payload.repoName);
  },
  getState: function() {
    return {
      all: this.notifications,
      current: this.current
    }
  }
});

module.exports = NotiStore;