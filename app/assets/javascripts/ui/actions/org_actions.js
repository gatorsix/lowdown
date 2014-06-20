'use strict';

var OrgActions = {
  seedOrgs: function(orgs, defaultOrg) {
    return this.dispatch('ORGS_SEED', {orgs:orgs, defaultOrg:defaultOrg});
  }
};

module.exports = OrgActions;