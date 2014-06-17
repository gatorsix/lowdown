'use strict';

var director = require('director');
var _ = require('lodash');

var router = new director.Router().configure({ html5history:true });

function orgsAdded(newState, oldState) {
  return oldState.orgs.length === 0 && newState.orgs.length > 0
}

var Routing = {
  getDefaultProps: function() {
    return {
      router: router
    };
  },
  componentWillMount: function() {
    var app = this;
    var routes = {
      '/': function() {
        var defaultOrg = app.state.orgs[0].login;
        var path = '/orgs/'+defaultOrg+'/repos';

        function redirect() {
          // TODO: this should "replace state"
          app.props.router.setRoute(path);
        }

        if(window.onpopstate) {
          redirect();
        } else {
          // This works around a workaround in Flation Director:
          // https://github.com/flatiron/director/issues/233
          setTimeout(redirect, 500);
        }
      },
      '/orgs/:org/repos': function(orgName) {
        var org = _.find(app.state.orgs, {login:orgName});
        app.setState({ currentOrg:org });
      }
    }
    this.props.router.routes = routes;
    this.props.router.mount(routes);
  },
  componentDidUpdate: function(prevProps, prevState) {
    if(orgsAdded(this.state, prevState)) {
      this.props.router.init();
    }
  }
};

module.exports = Routing;