var $ = require('./vendor/zepto.js'),
    React = require('react'),
    BugTracker = require('./BugTracker'),
    InterfaceBox = require('./InterfaceBox.jsx');

$.getJSON('status.json').then(function(interfaces) {
  var renderInterface = function(interface) {
    // Massage members array into something nicer
    var members = Object.keys(interface.members).map(function(name) {
      var result = interface.members[name];
      result.name = name;
      result.interface = interface.name;
      result.status = result.status || 'none';
      return result;
    });

    return <InterfaceBox name={interface.name} members={members}
                         key={interface.name}/>;
  };

  React.render(
    React.createElement(
      "container",
      {},
      interfaces.map(function(interface) {
        return renderInterface(interface);
      })
    ),
    document.getElementById('interfaces')
  );

  return BugTracker.fetch();
}).fail(function(xhr, error) {
  $(document.body).append('Failed to load status.json: ' + error);
  console.log(xhr.response);
  console.log(xhr.responseURL);
});
