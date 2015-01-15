var React = require('react'),
    BugDetail = require('./BugDetail.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return { open: false };
  },

  toggle: function() {
    this.setState({ open: !this.state.open }, function() {
      if (this.state.open) {
        this.refs.panel.getDOMNode().focus();
      }
    });
  },

  render: function() {
    return (
      <div id={this.props.id} className="details"
        role="region" tabIndex="-1" aria-expanded={this.state.open}
        ref="panel">
        <a href={this.props.specLink} className="specLink"
          target="_new">Spec &raquo;</a>
        { this.props.note
          ? <div className="notes">Notes: {this.props.note}</div>
          : null }
        <ul className="bug-list">
          {
            this.props.bugs.map(function(bugNum) {
              return <li key={'bug-detail-' + bugNum}>
                <BugDetail id={bugNum} />
              </li>;
            }.bind(this))
          }
        </ul>
      </div>
    );
  }
});
