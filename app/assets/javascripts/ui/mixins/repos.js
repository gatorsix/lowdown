'use strict';

var React = require('react/addons');

var Repos = {
  getInitialState: function() {
    return {
      repos: []
    };
  },
  handleRepoRetrieval: function(result) {
    var repos = React.addons.update(this.state.repos, {
      $push: result
    });

    this.setState({ repos:repos });
    if(result.nextPage) {
      result.nextPage().then(this.handleRepoRetrieval);
    }
  },
  componentDidUpdate: function(prevProps, prevState) {
    if(this.state.currentOrg !== prevState.currentOrg) {
      this.setState({ repos:[] });

      var action;
      if(this.state.currentOrg.id === -1) {
        action = this.props.user.repos.fetch();
      } else {
        action = this.props.github.orgs(this.state.currentOrg.login).repos.fetch();
      }
      action.then(this.handleRepoRetrieval);
    }
  },
};

module.exports = Repos;