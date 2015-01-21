var React = require('react'),
    BugInfoMixin = require('./BugInfoMixin');

module.exports = React.createClass({
  mixins: [BugInfoMixin],
  render: function() {
    if (this.state.loadState != 'load-complete' ||
        this.state.status == 'RESOLVED') {
      return null;
    }

    var titles = {
      'loading': 'loading bug information',
      'load-failed': 'failed to load bug information',
      'load-complete': this.state.summary +
                       ' (' + [ this.state.status,
                                this.state.resolution ].join(" ").trim() +
                       ')'
    };
    var title = titles[this.state.loadState];
    var className = this.state.loadState == 'load-complete'
                  ? this.state.status.toLowerCase()
                  : this.state.loadState;
    return (<span className={'bug ' + className}><a
      href={this.getBugLink()} title={title}>({this.props.id})</a></span>);
  }
});
