var React = require('react'),
    Interface = require('./Interface.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="interface-container">
        {
          this.props.interfaces.map(function(interface) {
            return <Interface key={interface.name} {...interface}/>;
          })
        }
      </div>
    );
  }
});
