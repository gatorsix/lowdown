'use strict';

var React = require('react');

var App = require('./ui/components/app.jsx');

var gh = new Octokit({
  token: window.TOKEN
});

var user = gh.getUser();

React.renderComponent(
  App({ user:user }),
  document.getElementById('ui')
);
