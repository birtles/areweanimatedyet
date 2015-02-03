var React = require('react'),
    BugIcon = require('./BugIcon.jsx'),
    MemberDetail = require('./MemberDetail.jsx');

module.exports = React.createClass({
  implementation: function() {
    // FIXME: Parameterize by implementer.
    return (this.props && this.props.firefox) || {};
  },
  hasDetails: function() {
    return this.implementation().note || this.implementation().bugs;
  },

  render: function() {
    var specLink =
      [ 'http://w3c.github.io/web-animations/#dom',
        this.props.interface.toLowerCase(),
        this.props.name == '[Constructor]'
        ? this.props.interface.toLowerCase()
        : this.props.name.toLowerCase() ].join('-') +
      (this.props.linkParams || "");
    var detailsId =
      [ 'details',
        this.props.interface.toLowerCase(),
        this.props.name.toLowerCase() ].join('-');

    return (
      <div className={'member ' + (this.implementation().status || 'none')}>
        <div className='member-summary'>
          { this.hasDetails()
            ? <a href={'#' + detailsId} aria-controls={detailsId}
                onClick={this.toggleDetails}>{this.props.name} &hellip;</a>
            : this.props.name }
          {' '}
          <span className='member-status'>{this.implementation().status}</span>
          { this.implementation().bugs
            ? this.implementation().bugs.map(function(bugNum) {
                return <BugIcon key={'bug-icon-' + bugNum}
                                id={bugNum} />;
              }.bind(this))
            : null
          }
          <a href={specLink} className="spec-link"
            target="_new"
            title={'Look up ' + this.props.name
                   + ' in the Web Animations spec'}><span>Spec
              &raquo;</span></a>
        </div>
        { this.hasDetails()
          ? <MemberDetail {...this.implementation()}
              id={detailsId} ref="details"/>
          : null }
      </div>
    );
  },

  toggleDetails: function(evt) {
    this.refs.details.toggle();
    evt.preventDefault();
  }
});
