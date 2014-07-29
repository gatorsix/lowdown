/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var Routes = require('react-router').Routes;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

var Organizations = require('./organizations.jsx');
var Repositories = require('./repositories.jsx');

var Navigation = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object.isRequired,
    currentOrg: React.PropTypes.object.isRequired,
    orgs: React.PropTypes.array.isRequired,
    currentRepo: React.PropTypes.object.isRequired,
    repos: React.PropTypes.array.isRequired
  },
  render: function() {
    return (
      <nav className="ld-nav">
        <Organizations
          currentUser={this.props.currentUser}
          orgs={this.props.orgs}
          currentOrg={this.props.currentOrg}
        />
        <Repositories
          currentUser={this.props.currentUser}
          repos={this.props.repos}
          currentRepo={this.props.currentRepo}
        />
      </nav>
    );
  }
});

module.exports = Navigation;