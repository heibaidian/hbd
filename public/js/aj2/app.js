// Declare app level module which depends on views, and components
angular.module('myAppList', [
  'ngRoute',
  'myAppList.material'
]).
config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
  $routeProvider.otherwise({redirectTo: '/404'});
}]);

angular.module('myAppList2', [
  'ngRoute',
  'myAppList2.tel'
]).
config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
  $routeProvider.otherwise({redirectTo: '/404'});
}]);