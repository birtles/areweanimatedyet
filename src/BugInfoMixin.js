var $ = require('./vendor/zepto.js'),
    BugTracker = require('./BugTracker');

module.exports = {
  getInitialState: function() {
    return { loadState: 'loading' };
  },

  componentWillMount: function() {
    BugTracker.getBug(this.props.id).then(function(bug) {
      this.setState($.extend({ loadState: 'load-complete' }, bug));
    }.bind(this)).fail(function(reason) {
      console.warn('Failed to fetch info for bug ' + this.props.id
                   + ' (reason: ' + reason + ')');
      this.setState({ loadState: 'load-failed' });
    }.bind(this));
  },

  getBugLink: function() {
    return 'https://bugzilla.mozilla.org/show_bug.cgi?id=' + this.props.id;
  }
};
