angular.module('myApp.tel', ['ngRoute','ng-file-model'])
	.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.when('/tel', {
				templateUrl: 'js/aj/tel/index.html',
				controller: 'tel1Ctrl'
			}).when('/tel/opt', {
				templateUrl: 'js/aj/tel/opt.html',
				controller: 'tel2Ctrl'
			}).when('/tel/opt/:id', {
				templateUrl: 'js/aj/tel/opt.html',
				controller: 'tel2Ctrl'
			});
		}
	])

.controller('tel1Ctrl', ['$scope', '$http', '$templateCache',
	function($scope, $http, $templateCache) {
		$scope.load = function() {
			$http({
				method: 'GET',
				url: 'tel/find',
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
				url: 'tel/del/' + id,
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
	.controller('tel2Ctrl', ['$scope', '$http', '$templateCache', '$routeParams', '$location',
		function($scope, $http, $templateCache, $routeParams, $location) {
			$scope.method = "post";
			$scope.url = "tel/create";
			$scope.optname = "添加";

			if($routeParams.id != undefined){
				$http({
					method: 'get',
					url: 'tel/find/' + $routeParams.id,
					cache: false
				}).
				success(function(data, status) {
					$scope.tel = data;
					$scope.url = 'tel/update/' + $routeParams.id;
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
						$location.path('/tel');
					}

				}).
				error(function(data, status) {
					$scope.data = data || "Request failed";
				});
			};

			var obj={};
			$scope.submit = function(obj){
			  // console.log(JSON.stringify(obj.testFile));
			  $http({
					method: 'post',
					url: "/file/upload",
					data: JSON.stringify(obj.testFile)
				}).
				success(function(data, status) {
					if (status == '200') {
						 $scope.tel.imgSrc=data;
					}
				}).
				error(function(data, status) {
					$scope.data = data || "Request failed";
				});
  			};
		}
	]);