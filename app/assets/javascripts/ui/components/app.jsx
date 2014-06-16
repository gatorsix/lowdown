/** @jsx React.DOM */
'use strict';

var React = require('react');


var App = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired
  },
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