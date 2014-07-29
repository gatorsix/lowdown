'use strict';

var React = require('react');

var Repositories = React.createClass({
  propTypes: {
    repos: React.PropTypes.array.isRequired
  },
  render: function() {
    return (
      <div>
        <h3>Repositories</h3>
        <div>count: {this.props.repos.length}</div>
        <ul>
          {this.props.repos.map(function(repo) {
            return (
              <li key={repo.id}>
                <a href={'/orgs/'+repo.owner.login+'/repos/'+repo.name}>{repo.name}</a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
});

module.exports = Repositories;