'use strict';

var OrgActions = {
  fetchAllOrgs: function() {
    return this.dispatch('ORGS_FETCH_ALL');
  }
};

module.exports = OrgActions;