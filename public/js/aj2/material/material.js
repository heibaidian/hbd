angular.module('myAppList.material', ['ngRoute'])
	.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.when('/', {
				templateUrl: 'js/aj2/material/list.html',
				controller: 'material2Ctrl'
			}).when('/limit/:pagesize/:start', {
				templateUrl: 'js/aj2/material/list.html',
				controller: 'material2Ctrl'
			});
		}
	])

.controller('material2Ctrl', ['$scope', '$http', '$templateCache','$routeParams',
	function($scope, $http, $templateCache,$routeParams) {
		var url='';
		if(typeof($routeParams.start)== 'undefined' || typeof($routeParams.pagesize)== 'undefined')
			url='material/find/limit/18/0';
		else
			url='material/find/limit/'+$routeParams.pagesize+'/'+$routeParams.start;
			$http({
			method: 'GET',
			url: url,
			cache: false
		}).
		success(function(data, status) {
			$scope.list = data;
		}).
		error(function(data, status) {
			$scope.list = data || "Request failed";
		});

		$http({
			method: 'GET',
			url: 'material/distinct',
			cache: $templateCache
		}).
		success(function(data, status) {
			$scope.sort = data;
		}).
		error(function(data, status) {
			$scope.sort = data || "Request failed";
		});
	}
]);