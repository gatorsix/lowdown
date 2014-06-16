/** @jsx React.DOM */
'use strict';

var React = require('react');

var ReposMixin = require('../mixins/repos.js');
var OrgsMixin = require('../mixins/orgs.js');

var App = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired
  },
  mixins: [OrgsMixin, ReposMixin],
  render: function() {
    return (
      <div>
        <h3>Organizations</h3>
        <ul>
          {this.state.orgs.map(function(org) {
            return <li key={org.id}>{org.login}</li>
          })}
        </ul>

        <h3>Repos</h3>
        <ul>
          {this.state.repos.map(function(repo) {
            return <li key={repo.id}>{repo.name}</li>
          })}
        </ul>
      </div>
    );
  }
})

module.exports = App;