angular.module('myApp.company', ['ngRoute','ng-file-model','textAngular'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/company', {
    templateUrl: 'js/aj/company/index.html',
    controller: 'company1Ctrl'
  }).when('/company/opt', {
    templateUrl: 'js/aj/company/opt.html',
    controller: 'company2Ctrl'
  }).when('/company/opt/:id', {
	templateUrl: 'js/aj/company/opt.html',
	controller: 'company2Ctrl'
 });
}])

.controller('company1Ctrl',['$scope', '$http', '$templateCache',function($scope, $http, $templateCache) {
		$scope.load = function() {
			$http({
				method: 'GET',
				url: 'company/find',
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
				url: 'company/del/' + id,
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
	.controller('company2Ctrl', ['$scope', '$http', '$templateCache', '$routeParams', '$location',
		function($scope, $http, $templateCache, $routeParams, $location) {
			$scope.method = "post";
			$scope.url = "company/create";
			$scope.optname = "添加";

			if($routeParams.id != undefined){
				$http({
					method: 'get',
					url: 'company/find/' + $routeParams.id,
					cache: false
				}).
				success(function(data, status) {
					$scope.company = data;
					$scope.url = 'company/update/' + $routeParams.id;
					$scope.optname = "修改";
				}).
				error(function(data, status) {
					$scope.data = data || "Request failed";
				});
			}

			$scope.opt = function(company) {
				console.log(company);
				$http({
					method: $scope.method,
					url: $scope.url,
					data: company,
					cache: $templateCache
				}).
				success(function(data, status) {
					if (status == '200') {
						console.log('in');
						$location.path('/company');
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
						 $scope.company.imgSrc=data;
					}
				}).
				error(function(data, status) {
					$scope.data = data || "Request failed";
				});
  			};
		}
	]);