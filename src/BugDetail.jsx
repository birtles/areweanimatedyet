var React = require('react'),
    BugInfoMixin = require('./BugInfoMixin');

module.exports = React.createClass({
  mixins: [BugInfoMixin],
  render: function() {
    if (this.state.loadState == 'loading') {
      return (
        <span className="bug-detail loading"><a
          href={this.getBugLink()}>{this.props.id}</a> 
          {' '}Loading bug details&hellip;</span>
      );
    }
    if (this.state.loadState == 'load-failed') {
      return (
        <span className="bug-detail load-failed"><a
          href={this.getBugLink()}>{this.props.id}</a>
          {' '}(Failed to load bug details)</span>
      );
    }
    var status =
      [ this.state.status, this.state.resolution ].join(' ').trim();
    return (
      <span className={'bug-detail ' + this.state.status}><a
        href={this.getBugLink()}>{this.props.id} {this.state.summary}</a>
        {' '}<span className="bug-status">({status})</span></span>
    );
  }
});
