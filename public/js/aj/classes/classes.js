angular.module('myApp.classes', ['ngRoute'])
	.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.when('/classes', {
				templateUrl: 'js/aj/classes/index.html',
				controller: 'classes1Ctrl'
			}).when('/classes/opt', {
				templateUrl: 'js/aj/classes/opt.html',
				controller: 'classes2Ctrl'
			}).when('/classes/opt/:id', {
				templateUrl: 'js/aj/classes/opt.html',
				controller: 'classes2Ctrl'
			});
		}
	])

.controller('classes1Ctrl', ['$scope', '$http', '$templateCache',
	function($scope, $http, $templateCache) {
		$scope.load = function() {
			$http({
				method: 'GET',
				url: 'classes',
				cache: false
			}).
			success(function(data, status) {
				$scope.data = data;
			}).
			error(function(data, status) {
				$scope.data = data || "Request failed";
			});
		};

		$scope.del = function(id) {
			$http({
				method: 'get',
				url: 'classes/del/' + id,
				cache: $templateCache
			}).
			success(function(data, status) {
				if (status == '200')
					$scope.load();
			}).
			error(function(data, status) {
				$scope.data = data || "Request failed";
			});
		};

		$scope.load();
	}
])
	.controller('classes2Ctrl', ['$scope', '$http', '$templateCache', '$routeParams', '$location',
		function($scope, $http, $templateCache, $routeParams, $location) {
			$scope.method = "post";
			$scope.url = "classes/create";
			$scope.optname = "添加";

			if($routeParams.id != undefined){
				$http({
					method: 'get',
					url: 'classes/find/' + $routeParams.id,
					cache: false
				}).
				success(function(data, status) {
					$scope.classes = data;
					$scope.url = 'classes/update/' + $routeParams.id;
					$scope.optname = "修改";
				}).
				error(function(data, status) {
					$scope.data = data || "Request failed";
				});
			}

			$scope.opt = function(tel) {
				$http({
					method: $scope.method,
					url: $scope.url,
					data: tel,
					cache: $templateCache
				}).
				success(function(data, status) {
					if (status == '200') {
						console.log('in');
						$location.path('/classes');
					}

				}).
				error(function(data, status) {
					$scope.data = data || "Request failed";
				});
			};

		}
	]);