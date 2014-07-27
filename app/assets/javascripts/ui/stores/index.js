'use strict';

var NotificationStore = require('./notification_store');
var OrgStore = require('./org_store');
var RepoStore = require('./repo_store');
var RouteStore = require('./route_store');

module.exports = {
  NotificationStore: new NotificationStore(),
  OrgStore: new OrgStore(),
  RepoStore: new RepoStore(),
  RouteStore: new RouteStore()
};