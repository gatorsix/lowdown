'use strict';

var merge = require('react/lib/merge');

var actions = {};
actions = merge(actions, require('./notification_actions'));
actions = merge(actions, require('./org_actions'));
actions = merge(actions, require('./repo_actions'));
actions = merge(actions, require('./route_actions'));

module.exports = actions;