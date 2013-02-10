/*
 * Trac utilities.
 */

/*
 * Parse content and return trac ticket id as string.
 */
var getTracTicket = function(content) {
  // [#123] Title.
  var ticket_parser = /\[#(\d+)\].*/;
  match = ticket_parser.exec(content);
  if (!match) {
    return null;
  } else {
    return match[1];
  }
};


var getTracTicketFromPullURL = function(content) {
  // "/chevah/empirical/pull/new/chevah:master...897-failing-tests-on-windows"
  var ticket_parser = /.*\.\.\.(\d+)-.*/;
  match = ticket_parser.exec(content);
  console.log(content);
  console.log(match);
  if (!match) {
    return null;
  } else {
    return match[1];
  }
};

/*
 * Return the HTML for a Trac ticket url.
 */
var generateTracLink = function(ticket, configuration) {
    url = configuration.trac_url + '/ticket/' + ticket;
    return ' (trac:<a href="'+url+'">#'+ticket+'</a>) ';
};