/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var Fluxxor = require('fluxxor');

var FluxMixin = Fluxxor.FluxMixin(React);
var FluxChildMixin = Fluxxor.FluxChildMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Navigation = require('./navigation/index.jsx');
var Notifications = require('./notifications.jsx');

var App = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    flux: React.PropTypes.object.isRequired,
    orgs: React.PropTypes.array.isRequired,
    notifications: React.PropTypes.array.isRequired
  },
  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      orgs: flux.store('OrgStore').getState(),
      repos: flux.store('RepoStore').getState(),
      notifications: flux.store('NotificationStore').getState()
    }
  },
  mixins: [FluxMixin, StoreWatchMixin('NotificationStore','OrgStore','RepoStore','RouteStore')],
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
      <article className="ld-app">
        <Navigation orgs={this.state.orgs.all} currentOrg={this.state.orgs.current} repos={this.state.repos.all}/>
        <main className="ld-main">
          <Notifications notifications={this.state.notifications.all}/>
        </main>
      </article>
    );
  }
})

module.exports = App;