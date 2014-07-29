'use strict';

var _ = require('lodash');
var page = require('page');

var USER_REPO = '/'+window.PROFILE.username+'/repos';

var redirectToUserRepo = _.curry(function(ctx, next) {
  // Redirect: https://github.com/visionmedia/page.js/issues/94
  setTimeout(function() {
    page.replace(USER_REPO);
  }, 0);
});

var user = _.curry(function(flux, ctx, next) {
  flux.actions.fetchCurrentUser();
  next();
});

var userRepos = _.curry(function(flux, ctx) {
  flux.actions.fetchAllUserRepos();
});

var userReposMW = _.curry(function(flux, ctx, next) {
  userRepos(flux, ctx, next);
  next();
});

var orgs = _.curry(function(flux, ctx, next) {
  flux.actions.fetchAllOrgs();
  next();
});

var orgRepos = _.curry(function(flux, ctx) {
  flux.actions.fetchAllOrgRepos(ctx.params.orgName);
});

var orgReposMW = _.curry(function(flux, ctx, next) {
  orgRepos(flux, ctx, next);
  next();
});

var notifications = _.curry(function(flux, ctx, next) {
  var owner = ctx.params.orgName || ctx.params.username;
  flux.actions.fetchRepoNotifications(owner, ctx.params.repoName)
});

function notfound() {
  console.warn('not found');
}

module.exports = {
  componentWillMount: function() {
    var flux = this.props.flux;
    page('/', redirectToUserRepo);
    page('/:username', redirectToUserRepo);
    page('/:username/*', user(flux), orgs(flux));

    page('/:username/repos', userRepos(flux));
    page('/:username/repos/*', userReposMW(flux));
    page('/:username/repos/:repoName/notifications', notifications(flux));

    page('/:username/orgs/:orgName/repos', orgRepos(flux));
    page('/:username/orgs/:orgName/repos/*', orgReposMW(flux));
    page('/:username/orgs/:orgName/repos/:repoName/notifications', notifications(flux));
    page('*', notfound);
    page();
  }
};