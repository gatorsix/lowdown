/** @jsx React.DOM */
'use strict';

var React = require('react');

var ReposMixin = require('../mixins/repos.js');
var OrgsMixin = require('../mixins/orgs.js');
var RoutingMixin = require('../mixins/routing.js');

var App = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      currentOrg: {}
    };
  },
  mixins: [OrgsMixin, ReposMixin, RoutingMixin],
  componentDidMount: function() {
    this.getDOMNode().addEventListener('click', this.handleClick);
  },
  handleClick: function(e) {
    if(e.target.rel === 'external') return;
    e.preventDefault();
    this.props.router.setRoute(e.target.href);
  },
  render: function() {
    return (
      <div>
        <a href="/">home</a>
        <h3>Organizations</h3>
        <div>current: {this.state.currentOrg.login}</div>
        <ul>
          {this.state.orgs.map(function(org) {
            return (
              <li key={org.id}>
                <a href={'/orgs/'+org.login+'/repos'}>{org.login}</a>
              </li>
            );
          }.bind(this))}
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