angular.module('myApp.material', ['ngRoute','ng-file-model'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/material', {
    templateUrl: 'js/aj/material/index.html',
    controller: 'material1Ctrl'
  }).when('/material/opt', {
    templateUrl: 'js/aj/material/opt.html',
    controller: 'material2Ctrl'
  }).when('/material/opt/:id', {
	templateUrl: 'js/aj/material/opt.html',
	controller: 'company2Ctrl'
 });
}])

.controller('material1Ctrl',['$scope', '$http', '$templateCache',function($scope, $http, $templateCache) {
		$scope.load = function() {
			$http({
				method: 'GET',
				url: 'material/find',
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
				url: 'material/del/' + id,
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
	.controller('material2Ctrl', ['$scope', '$http', '$templateCache', '$routeParams', '$location',
		function($scope, $http, $templateCache, $routeParams, $location) {
			$scope.method = "post";
			$scope.url = "material/create";
			$scope.optname = "添加";

			if($routeParams.id != undefined){
				$http({
					method: 'get',
					url: 'material/find/' + $routeParams.id,
					cache: false
				}).
				success(function(data, status) {
					$scope.material = data;
					$scope.url = 'material/update/' + $routeParams.id;
					$scope.optname = "修改";
				}).
				error(function(data, status) {
					$scope.data = data || "Request failed";
				});
			}

			$scope.opt = function(material) {
				$http({
					method: $scope.method,
					url: $scope.url,
					data: material
				}).
				success(function(data, status) {
					if (status == '200') {
						$location.path('/material');
					}

				}).
				error(function(data, status) {
					$scope.data = data || "Request failed";
				});
			};

			var obj={};
			$scope.submit = function(obj){
			  $http({
					method: 'post',
					url: "/file/upload",
					data: JSON.stringify(obj.testFile)
				}).
				success(function(data, status) {
					if (status == '200') {
						 $scope.material.imgSrc=data;
					}
				}).
				error(function(data, status) {
					$scope.data = data || "Request failed";
				});
  			};

  			$scope.passData =[{'pass':0,'label':'否'},{'pass':1,'label':'是'}];


  			$http({
				method: 'GET',
				url: 'classes',
				cache: false
			}).
			success(function(data, status) {
				$scope.classes = data;
			})
		}
	]);