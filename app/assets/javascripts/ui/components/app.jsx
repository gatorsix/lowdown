/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var Fluxxor = require('fluxxor');

var FluxMixin = Fluxxor.FluxMixin(React);
var FluxChildMixin = Fluxxor.FluxChildMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var App = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    flux: React.PropTypes.object.isRequired,
    orgs: React.PropTypes.array.isRequired,
  },
  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      orgs: flux.store('OrgStore').getState(),
      repos: flux.store('RepoStore').getState()
    }
  },
  mixins: [FluxMixin, StoreWatchMixin('OrgStore','RepoStore','RouteStore')],
  componentWillMount: function() {
    var orgs = this.props.orgs;

    this.getFlux().actions.seedOrgs(orgs, orgs[0]);
    this.getFlux().actions.initRouter();
  },
  componentDidMount: function() {
    this.getDOMNode().addEventListener('click', this.handleClick);
  },
  handleClick: function(e) {
    if(e.target.rel === 'external') return;
    e.preventDefault();
    this.getFlux().actions.navigateTo(e.target.href);
  },
  render: function() {
    return (
      <div>
        <a href="/">home</a>
        <h3>Organizations</h3>
        <div>current: {this.state.orgs.current.login}</div>
        <ul>
          {this.state.orgs.all.map(function(org) {
            return (
              <li key={org.id}>
                <a href={'/orgs/'+org.login+'/repos'}>{org.login}</a>
              </li>
            );
          })}
        </ul>

        <h3>Repositories</h3>
        <div>count: {this.state.repos.all.length}</div>
        <ul>
          {this.state.repos.all.map(function(repo) {
            return (
              <li key={repo.id}>
                <a href={'/'}>{repo.name}</a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
})

module.exports = App;