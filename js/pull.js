var configuration = {};

$(function(){
  loadConfigurationChromeStorage(function(new_config){
    configuration = new_config;

    updateTracLinks();
    fillNewPullTitle();
    fillNewPullBody();
  });
});


/*
 * Expand all pull request to Trac links.
 */
var updateTracLinks = function(){

  if (!configuration.links_enabled) {
    return;
  }

  $('a.issue-link').each(function(index){
    ticket = trac.getTracTicket($(this).attr('title'));
    if (ticket) {
      $(this).after(trac.generateTracLink(ticket, configuration));
    }
  });

};


/*
 * Update new pull request body with review request template.
 */
var fillNewPullBody = function(){

  if (!configuration.review_template_enabled) {
    return;
  }

  pull_request_body = $('textarea#pull_request_body')[0];
  /* No pull reqest on the page. */
  if (typeof pull_request_body === 'undefined') {
    return;
  }

  /* Body is not empty. */
  if ($.trim($(pull_request_body).text()) !== "") {
    return;
  }
  
  $(pull_request_body).text(configuration.review_template_body);

};



/*
 * Update new pull request title with Trac ticket it.
 */
var fillNewPullTitle = function(){

  if (!configuration.review_title_enabled) {
    return;
  }

  pull_request_title = $('input#pull_request_title')[0];

  /* No pull reqest on the page. */
  if (typeof pull_request_title === 'undefined') {
    return;
  }

  ticket_id = trac.getTracTicketFromPullURL(window.location.pathname);

  // Ticket id not found.
  if (!ticket_id) {
    return;
  }

  title = $(pull_request_title).val();
  title = '[#' + ticket_id + '] ' + title;
  $(pull_request_title).val(title);

};

