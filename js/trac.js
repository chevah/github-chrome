/*
 * Trac utilities.
 */

/*
 Require JS Wrapper.
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([], function() {

  var exports = {};

  return exports;
});
*/

(function(exports){

  /*
   * Parse content and return trac ticket id as string.
   */
  exports.getTracTicket = function(content) {
    // [#123] Title.
    var ticket_parser = /\[#(\d+)\].*/;
    var match = ticket_parser.exec(content);
    if (!match) {
      return null;
    } else {
      return match[1];
    }
  };

  /*
   * /user/repo/pull/new/chevah:master...897-failing-tests-on-windows"
   * /user/repo/pull/new/chevah:1080-win-conf...1006-ftp-timeout
   * /user/repo/pull/new/1006-ftp-timeout
   *
   * http://gskinner.com/RegExr/?33o30
   */
  exports.getTracTicketFromPullURL = function(content) {
    var ticket_parser = /.*(\.\.\.|\/)(\d+)-.*/;
    var match = ticket_parser.exec(content);
    if (!match) {
      return null;
    } else {
      return match[2];
    }
  };

  /*
   * Return the HTML for a Trac ticket url.
   */
  exports.generateTracLink = function(ticket, configuration) {
      var url = configuration.trac_url + '/ticket/' + ticket;
      return ' (trac:<a href="'+url+'">#'+ticket+'</a>) ';
  };

})(typeof exports === 'undefined'? this['trac']={}: exports);
