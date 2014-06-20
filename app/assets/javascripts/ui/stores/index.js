'use strict';

var OrgStore = require('./org_store');
var RepoStore = require('./repo_store');
var RouteStore = require('./route_store');

module.exports = {
  OrgStore: new OrgStore(),
  RepoStore: new RepoStore(),
  RouteStore: new RouteStore()
};