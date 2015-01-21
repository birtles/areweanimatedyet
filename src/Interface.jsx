var React = require('react'),
    Member = require('./Member.jsx');

module.exports = React.createClass({
  render: function() {
    var specLink =
      'http://w3c.github.io/web-animations/#'
      + this.props.name.toLowerCase();
    return (
      <div className="interface">
        <div className="interface-header">
          <h2 className="interface-name"><a
            href={specLink}>{this.props.name}</a>
          </h2>
        </div>
        <ul className="member-list">
          {
            this.props.members.map(function(member) {
              return <li key={member.name}><Member {...member} /></li>;
            })
          }
        </ul>
      </div>
    );
  }
});
