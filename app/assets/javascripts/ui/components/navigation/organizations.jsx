'use strict';

var React = require('react');

var Organizations = React.createClass({
  propTypes: {
    currentOrg: React.PropTypes.object.isRequired,
    orgs: React.PropTypes.array.isRequired
  },
  render: function() {
    return (
      <section>
        <h3>Organizations</h3>
        <div>current: {this.props.currentOrg.login}</div>
        <ul>
          {this.props.orgs.map(function(org) {
            return (
              <li key={org.id}>
                <a href={'/orgs/'+org.login+'/repos'}>{org.login}</a>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
});

module.exports = Organizations;