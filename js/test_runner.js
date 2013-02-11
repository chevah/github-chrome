/*
 * Execute tests using RequireJS loader.
 */
require.config({
  baseUrl:'js/',
  urlArgs: "v="+(new Date()).getTime()
});

// Require libraries
require(['libs/chai', 'libs/mocha'],
function(chai){

  assert = chai.assert;
  mocha.ui('tdd');

  // Require base tests before starting.
  require(['tests/test_trac'], function(trac) {
    mocha.run();
  });

});