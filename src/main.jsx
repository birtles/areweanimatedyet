var $ = require('./vendor/zepto.js'),
    React = require('react'),
    BugTracker = require('./BugTracker'),
    InterfaceContainer = require('./InterfaceContainer.jsx');

$.getJSON('status.json').then(function(interfaces) {
  interfaces.forEach(function(interface) {
    // Massage members array into something easier to work with
    interface.members = Object.keys(interface.members).map(function(name) {
      var result = interface.members[name];
      result.name = name;
      result.interface = interface.name;
      return result;
    });
  });

  // Sort by number of members so that smaller items clump together and use the
  // space more efficiently.
  interfaces.sort(function(a, b) {
    return a.members.length < b.members.length;
  });

  React.render(
    <InterfaceContainer interfaces={interfaces}/>,
    document.getElementById('interfaces')
  );

  return BugTracker.fetch();
}).fail(function(xhr, error) {
  $(document.body).append('Failed to load status.json: ' + error);
  console.log(xhr.response);
  console.log(xhr.responseURL);
});

