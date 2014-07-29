'use strict';

require('octokat/dist/octokat');
var React = require('react/addons');
var Fluxxor = require('fluxxor');
var merge = require('react/lib/merge');

var App = require('./ui/components/app.jsx');

var stores = require('./ui/stores');
var actions = require('./ui/actions');
var flux = new Fluxxor.Flux(stores, actions);

React.renderComponent(
  App({ flux:flux }),
  document.getElementById('ui')
);