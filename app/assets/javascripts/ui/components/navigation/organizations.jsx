'use strict';

var _ = require('lodash');
var React = require('react');

var Organizations = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object.isRequired,
    currentOrg: React.PropTypes.object.isRequired,
    orgs: React.PropTypes.array.isRequired
  },
  render: function() {
    var user = this.props.currentUser;
    return (
      <section>
        <h3>Organizations</h3>
        <div>current: {user.login}</div>
        <div>current: {this.props.currentOrg.login}</div>
        <ul>
          <li key={'u'+user.id}>
            <a href={'/'+user.login+'/'}>{user.login}</a>
          </li>
          {this.props.orgs.map(function(org) {
            return (
              <li key={org.id}>
                <a href={'/'+user.login+'/orgs/'+org.login+'/repos'}>{org.login}</a>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
});

module.exports = Organizations;