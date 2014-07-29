'use strict';

var Fluxxor = require('fluxxor');
var _ = require('lodash');
var emptyObj = require('react/lib/emptyObject');
var UserActions = require('../actions/github_user_actions');

var gh = new Octokat({
  token: window.TOKEN
});

var GithubUserStore = Fluxxor.createStore({
  actions: {
    GH_USER_FETCH_CURRENT: 'fetchCurrentUser'
  },
  initialize: function() {
    this.current = emptyObj;
  },
  fetchCurrentUser: function(user) {
    var store = this;
    gh.me.fetch().then(function(user) {
      store.current = user;
      store.emit('change');
    });
  },
  getState: function() {
    return {
      current: this.current
    }
  }
});

module.exports = GithubUserStore;