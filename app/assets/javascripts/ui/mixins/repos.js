'use strict';

var Repos = {
  getInitialState: function() {
    return {
      repos: []
    };
  },
  handleRepoRetrieval: function(repos) {
    this.setState({ repos:repos })
  },
  componentWillMount: function() {
    this.props.user.getRepos({type:'member'}).then(this.handleRepoRetrieval);
  },
};

module.exports = Repos;