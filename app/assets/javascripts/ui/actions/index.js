'use strict';

var merge = require('react/lib/merge');

var actions = {};
actions = merge(actions, require('./github_user_actions'));
actions = merge(actions, require('./notification_actions'));
actions = merge(actions, require('./org_actions'));
actions = merge(actions, require('./repo_actions'));

module.exports = actions;