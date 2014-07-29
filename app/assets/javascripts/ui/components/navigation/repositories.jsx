'use strict';

var React = require('react');

function routeTo(user, repo) {
  return repo.owner.login === user.login?
    '/'+user.login+'/repos/'+repo.name+'/notifications' :
    '/'+user.login+'/orgs/'+repo.owner.login+'/repos/'+repo.name+'/notifications';
}

var Repositories = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object.isRequired,
    currentRepo: React.PropTypes.object.isRequired,
    repos: React.PropTypes.array.isRequired
  },
  render: function() {
    var user = this.props.currentUser;
    return (
      <div>
        <h3>Repositories</h3>
        <div>current: {this.props.currentRepo.name}</div>
        <div>count: {this.props.repos.length}</div>
        <ul>
          {this.props.repos.map(function(repo) {
            return (
              <li key={repo.id}>
                <a href={routeTo(user, repo)}>{repo.name}</a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
});

module.exports = Repositories;