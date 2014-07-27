'use strict';

var NotiActions = {
  seedNotifications: function() {
    return this.dispatch('NOTIFICATIONS_SEED', {});
  }
};

module.exports = NotiActions;