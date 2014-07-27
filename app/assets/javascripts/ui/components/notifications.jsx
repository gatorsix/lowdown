'use strict';

var React = require('react');

var Nofications = React.createClass({
  propTypes: {
    notifications: React.PropTypes.array.isRequired
  },
  render: function() {
    return (
      <div>
        <h3>Recent Notifications</h3>

        <button>Create New</button>

        <ul>
          {this.props.notifications.map(function(notification) {
            return (
              <li key={notification.id}>
                <a href={'/'}>notification</a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
});

module.exports = Nofications;