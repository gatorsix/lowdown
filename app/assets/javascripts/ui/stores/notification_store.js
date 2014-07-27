'use strict';

var Fluxxor = require('fluxxor');
var _ = require('lodash');
var emptyObj = require('react/lib/emptyObject');
var NotiActions = require('../actions/notification_actions');

var NotiStore = Fluxxor.createStore({
  actions: {
    NOTIFICATIONS_SEED: 'handleNotiSeed'
  },
  initialize: function() {
    this.notifications = [];
    this.current = emptyObj;
  },
  handleNotiSeed: function(payload) {
  },
  getState: function() {
    return {
      all: this.notifications,
      current: this.current
    }
  }
});

module.exports = NotiStore;