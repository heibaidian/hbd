// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.company',
  'myApp.design',
  'myApp.material',
  'myApp.module',
  'myApp.tel',
  'myApp.article',
  'myApp.classes'
]).
config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
  $routeProvider.otherwise({redirectTo: '/company'});
}]);
