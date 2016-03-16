angular.module('myAppList2.tel', ['ngRoute'])
	.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.when('/', {
				templateUrl: 'js/aj2/tel/list.html',
				controller: 'tel2Ctrl'
			}).when('/limit/:pagesize/:start', {
				templateUrl: 'js/aj2/tel/list.html',
				controller: 'tel2Ctrl'
			});
		}
	])

.controller('tel2Ctrl', ['$scope', '$http', '$templateCache','$routeParams',
	function($scope, $http, $templateCache,$routeParams) {
		var url='';
		if(typeof($routeParams.start)== 'undefined' || typeof($routeParams.pagesize)== 'undefined')
			url='tel/find/limit/18/0';
		else
			url='tel/find/limit/'+$routeParams.pagesize+'/'+$routeParams.start;

		$http({
			method: 'GET',
			url: url,
			cache: $templateCache
		}).
		success(function(data, status) {
			$scope.list = data;
		}).
		error(function(data, status) {
			$scope.list = data || "Request failed";
		});

		$http({
			method: 'GET',
			url: 'tel/distinct',
			cache: $templateCache
		}).
		success(function(data, status) {
			$scope.sort = data;
		}).
		error(function(data, status) {
			$scope.sort = data || "Request failed";
		});

		$http({
			method: 'GET',
			url: 'tel/distinct2',
			cache: $templateCache
		}).
		success(function(data, status) {
			console.log(data);
			$scope.sort2 = data;
		}).
		error(function(data, status) {
			$scope.sort2 = data || "Request failed";
		});
	}
]);