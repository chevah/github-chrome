/*
 * Configuration for Chevah Github Extension.
 */
 /*jshint multistr:true */
var configuration_key = 'chevah_github';


var review_template_body ="\n\
Problem description\n\
===================\n\
\n\
Describe the problem that these changes wants to solve.\n\
This content should be created when a ticket is submitted and just link\n\
the ticket or copy paste the ticket description... or find a way for\n\
linking this review to a ticket.\n\
\n\
\n\
Why we got into this (5 whys)\n\
=============================\n\
\n\
Mainly used for bugs.\n\
Describe why we got this problem in the first place. What went wrong.\n\
Repeatedly ask the question “Why” (up to 5 times) to determine to\n\
cause of this problem.\n\
\n\
\n\
Changes description\n\
===================\n\
\n\
Describe how the problem was fixed.\n\
What changes were done.\n\
What actions were performed.\n\
What was not done yet and link to the ticket for the still to do work.\n\
\n\
\n\
How to try and test the changes\n\
===============================\n\
\n\
reviewers @some-dude @another-dude\n\
\n\
What code / repositories were affected. Where is the code.\n\
If the code in only on a single feature branch, no need to say something\n\
about the code.\n\
\n\
How the changes can be tested and verified as an end user.\n\
A list of steps to follow for checking that everything is OK.\n\
";

var default_value = {
  trac_url: 'https://trac.chevah.com:10443',
  links_enabled: true,
  review_title_enabled: true,
  review_template_enabled: true,
  review_template_body: review_template_body
};


/*
 * Get the configuration object from the localStorage persistance.
 */
var loadConfigurationLocalStorage = function() {

  // Check and init root.
  if (typeof localStorage[configuration_key] === "undefined") {
    console.log('Initializing root configuration.');
    localStorage[configuration_key] = JSON.stringify({});
  }

  // Get configuration object from persistance.
  var configuration;
  try {
    configuration = JSON.parse(localStorage["chevah_github"]);
  } catch(error) {
    configuration = {};
  }

  // Initialize default values if required.
  $.each(default_value, function(key, value){
    if (typeof(configuration[key]) === "undefined") {
      console.log('Initializing ' + key);
      configuration[key] = value;
    }
  });

  return configuration;
};


/*
 * Persist the configuration object into localStorage.
 */
var saveConfigurationLocalStorage = function(configuration) {
  console.log('Saving configuration:');
  console.log(configuration);
  localStorage[configuration_key] = JSON.stringify(configuration);
};



/*
 * Reset configuration to default values in localStorage.
 */
var resetConfigurationLocalStorage = function() {
  console.log("Reseting the localStorage configuration");
  localStorage[configuration_key] = JSON.stringify({});
  configuration = loadConfiguration();
};



/*
 * Get configuration frol chrome storage
 */
var loadConfigurationChromeStorage = function(callback) {

  chrome.storage.local.get(configuration_key, function(result){
    var configuration;
    console.log('got configuration %o:', result);

    if (typeof result[configuration_key] !== "object") {
      configuration = {};
    } else {
      if (result[configuration_key]){
        configuration = result[configuration_key];
      } else {
        configuration = {};
      }
    }

    // Initialize default values if required.
    var init_required = false;
    $.each(default_value, function(key, value){
      if (typeof configuration[key] === "undefined") {
        console.log('Initializing ' + key);
        configuration[key] = value;
        init_required = true;
      }
    });

    // Persist new default values.
    if (init_required) {
      saveConfigurationChromeStorage(configuration);
    }

    callback(configuration);
  });

};

/*
 * Persist the configuration object into chrome.storage.
 */
var saveConfigurationChromeStorage = function(configuration) {
  update = {};
  update[configuration_key] = configuration;
  chrome.storage.local.set(update,
    function() {console.log('Configuration saved.');}
  );
};

/*
 *Reset configuration to default values in chrome.storage.
 */
var resetConfigurationChromeStorage = function(callback) {
  console.log("Reseting the chrome.storage configuration");
  saveConfigurationChromeStorage(null);
  loadConfigurationChromeStorage(callback);
};