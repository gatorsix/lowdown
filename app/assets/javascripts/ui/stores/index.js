'use strict';

var GithubUserStore = require('./github_user_store');
var NotificationStore = require('./notification_store');
var OrgStore = require('./org_store');
var RepoStore = require('./repo_store');

module.exports = {
  GithubUserStore: new GithubUserStore(),
  NotificationStore: new NotificationStore(),
  OrgStore: new OrgStore(),
  RepoStore: new RepoStore()
};