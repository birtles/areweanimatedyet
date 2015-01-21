var $ = require("./vendor/zepto.js");

var BugTracker = function() {
  var pendingBugs = [];
  var loadedBugs = [];

  return {
    fetch: function() {
      if (!pendingBugs.length) {
        var result = $.Deferred();
        result.resolve();
        return result;
      }

      var ids = Object.keys(pendingBugs).map(Number).join(',');
      var query = 'https://bugzilla.mozilla.org/rest/bug?id=' + ids
                  + '&include_fields=id,summary,status,resolution'
                  + ',last_change_time';
      var xhr = $.getJSON(query);
      var self = this;

      xhr.then(function(response) {

        response.bugs.forEach(function(bug) {
          loadedBugs[bug.id] = bug;
          if (pendingBugs.hasOwnProperty(bug.id)) {
            pendingBugs[bug.id].forEach(function(deferred) {
              deferred.resolve(bug);
            });
            delete pendingBugs[bug.id];
          }
        });

        for(id in pendingBugs) {
          pendingBugs[id].forEach(function(deferred) {
            deferred.reject('Bug not found');
          });
        }
        pendingBugs = [];

      }).fail(function(xhr, error) {
        for(id in pendingBugs) {
          pendingBugs[id].forEach(function(deferred) {
            deferred.reject(error);
          });
        }
      });

      return xhr;
    },

    getBug: function(id) {
      var deferred = $.Deferred();
      if (loadedBugs.hasOwnProperty(id)) {
        deferred.resolve(loadedBugs[id]);
      } else {
        if (pendingBugs.hasOwnProperty(id)) {
          pendingBugs[id].push(deferred);
        } else {
          pendingBugs[id] = [ deferred ];
        }
      }
      return deferred.promise();
    }
  };
};

// Export as a singleton. This is just easier than passing the bug tracker
// down through all the components.
module.exports = (new BugTracker());
