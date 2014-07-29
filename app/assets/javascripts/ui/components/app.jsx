/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var Fluxxor = require('fluxxor');

var FluxMixin = Fluxxor.FluxMixin(React);
var FluxChildMixin = Fluxxor.FluxChildMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var Router = require('../mixins/router');

var Navigation = require('./navigation/index.jsx');
var Notifications = require('./notifications.jsx');

var App = React.createClass({
  propTypes: {
    flux: React.PropTypes.object.isRequired
  },
  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      user: flux.store('GithubUserStore').getState(),
      orgs: flux.store('OrgStore').getState(),
      repos: flux.store('RepoStore').getState(),
      notifications: flux.store('NotificationStore').getState()
    }
  },
  mixins: [Router, FluxMixin, StoreWatchMixin('GithubUserStore','NotificationStore','OrgStore','RepoStore')],
  render: function() {
    return (
      <article className="ld-app">
        <Navigation
          currentUser={this.state.user.current}
          orgs={this.state.orgs.all}
          currentOrg={this.state.orgs.current}
          repos={this.state.repos.all}
          currentRepo={this.state.repos.current}
        />
        <main className="ld-main">
          <Notifications notifications={this.state.notifications.all}/>
        </main>
      </article>
    );
  }
});

module.exports = App;