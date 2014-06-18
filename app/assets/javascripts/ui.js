'use strict';

require('octokat/dist/octokat');
var React = require('react/addons');

var App = require('./ui/components/app.jsx');

var gh = new Octokat({
  token: window.TOKEN
});

var user = gh.me.fetch().then(function(user) {
  React.renderComponent(
    App({ user:user, github:gh }),
    document.getElementById('ui')
  );
});