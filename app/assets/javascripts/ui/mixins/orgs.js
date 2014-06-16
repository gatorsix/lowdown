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
  handleOrgRetrieval: function(result) {
    var profile = result[0];
    var orgs = result[1];
    orgs.unshift(profileAsOrg(profile));

    this.setState({ orgs:orgs })
  },
  componentWillMount: function() {
    when.all([
      this.props.user.getInfo(),
      this.props.user.getOrgs()
    ]).then(this.handleOrgRetrieval);
  },
};

module.exports = Orgs;