'use strict';

var when = require('when');

// Treat the user as a pseudo organization
function profileAsOrg(profile) {
  return {
    id: -1,
    login: profile.login
  }
};

var Orgs = {
  getInitialState: function() {
    return {
      orgs: []
    };
  },
  handleOrgRetrieval: function(orgs) {
    orgs.unshift(profileAsOrg(this.props.user));
    this.setState({ orgs:orgs });
  },
  componentWillMount: function() {
    this.props.github
      .me
      .orgs
      .fetch()
      .then(this.handleOrgRetrieval);
  }
};

module.exports = Orgs;