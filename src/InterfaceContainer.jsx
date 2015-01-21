var React = require('react'),
    InterfaceBox = require('./InterfaceBox.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="interface-container">
        {
          this.props.interfaces.map(function(interface) {
            return <InterfaceBox key={interface.name} {...interface}/>;
          })
        }
      </div>
    );
  }
});
