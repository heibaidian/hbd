angular.module('myApp.module', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/module', {
    templateUrl: 'js/aj/module/index.html',
    controller: 'modulel1Ctrl'
  });
}])

.controller('modulel1Ctrl', [function() {
	
}]);