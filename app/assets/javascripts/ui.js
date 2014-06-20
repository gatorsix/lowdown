'use strict';

require('octokat/dist/octokat');
var React = require('react/addons');
var Fluxxor = require('fluxxor');
var merge = require('react/lib/merge');

// Manually set an empty onpopstate work around director workaround
// for a Chrome issue
window.onpopstate = window.onpopstate || function(){};

var App = require('./ui/components/app.jsx');

var gh = new Octokat({
  token: window.TOKEN
});

var stores = require('./ui/stores');
var actions = require('./ui/actions');
var flux = new Fluxxor.Flux(stores, actions);

var user = gh.me.fetch().then(function(user) {
  var pseudoUserOrg = merge(user, {});
  pseudoUserOrg.id = -1;
  return gh.me.orgs.fetch().then(function(orgs) {
    orgs.unshift(pseudoUserOrg);
    React.renderComponent(
      App({ user:user, flux:flux, orgs:orgs }),
      document.getElementById('ui')
    );
  });
}).catch(function(error) {
  console.error(error.stack);
});