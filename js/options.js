// Save this script as `options.js`

var configuration = {};

$(function(){

  loadConfigurationChromeStorage(function(new_config){
    $.extend(configuration, new_config);
    angular.element($('.ng-scope')).scope().$digest();
  });

});

var configurationApp = angular.module('chevah_github', []);
configurationApp.config(function($routeProvider) {

  $routeProvider.
      when('/start', {
        templateUrl: 'partials/start.html',
        controller: GenericCtrl
      }).
      when('/pull', {
        templateUrl: 'partials/pull.html',
        controller: GenericCtrl
      }).
      when('/templates', {
        templateUrl: 'partials/templates.html',
        controller: TemplatesCtrl
      }).
      otherwise({
        redirectTo: '/start'
      });
});


function GenericCtrl($scope) {


  // $scope.$watch('trac_url', function(value){
  //   localStorageService.add('trac_url',value);
  //   $scope.trac_url = localStorageService.get('trac_url');
  // });

  $scope.$on('$routeChangeSuccess', onRouteSuccess);
  $scope.configuration = configuration;

  $scope.saveConfiguration = function(value) {
    saveConfigurationChromeStorage(value);
  };

  $scope.resetConfiguration = function() {
    resetConfigurationChromeStorage(function(new_config){
    $.extend(configuration, new_config);
    angular.element($('.ng-scope')).scope().$digest();
    });
  };

}


function TemplatesCtrl($scope) {

  var route_succeeded = function(current, previous) {
    onRouteSuccess(current, previous);
  };

  $scope.$on('$routeChangeSuccess', route_succeeded);

}


/*
 * Called when route was changed.
 */
var onRouteSuccess = function(current, previous) {
  var selected = 'selected';
  var view_name = $('.mainview > div').attr('id');

  // Set current menu.
  $('.menu li').removeClass(selected);
  $('.menu li.'+view_name).addClass(selected);

  // Scroll current view.
  var currentView = $('.mainview div.ng-scope');
  currentView.addClass('selected');
  setTimeout(function() {
    $('body')[0].scrollTop = 0;
  }, 200);


  // Register modal window.
  $('#launch_modal').click(function(ev) {
    ev.preventDefault();
    var modal = $('.overlay').clone();
    $(modal).removeAttr('style');
    $(modal).find('button').click(function() {
      $(modal).addClass('transparent');
      setTimeout(function() {
        $(modal).remove();
      }, 1000);
    });

    $(modal).click(function() {
      $(modal).find('.page').addClass('pulse');
      $(modal).find('.page').on('webkitAnimationEnd', function() {
        $(this).removeClass('pulse');
      });
    });
    $('body').append(modal);
  });
};

