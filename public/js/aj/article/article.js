angular.module('myApp.article', ['ngRoute','ng-file-model','textAngular'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/article', {
    templateUrl: 'js/aj/article/index.html',
    controller: 'article1Ctrl'
  }).when('/article/opt', {
    templateUrl: 'js/aj/article/opt.html',
    controller: 'article2Ctrl'
  }).when('/article/opt/:id', {
	templateUrl: 'js/aj/article/opt.html',
	controller: 'article2Ctrl'
 });
}])

.controller('article1Ctrl',['$scope', '$http', '$templateCache',function($scope, $http, $templateCache) {
		$scope.load = function() {
			$http({
				method: 'GET',
				url: 'article/find',
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
				url: 'article/del/' + id,
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
	.controller('article2Ctrl', ['$scope', '$http', '$templateCache', '$routeParams', '$location',
		function($scope, $http, $templateCache, $routeParams, $location) {
			$scope.method = "post";
			$scope.url = "article/create";
			$scope.optname = "添加";

			if($routeParams.id != undefined){
				$http({
					method: 'get',
					url: 'article/find/' + $routeParams.id,
					cache: false
				}).
				success(function(data, status) {
					$scope.article = data;
					$scope.url = 'article/update/' + $routeParams.id;
					$scope.optname = "修改";
				}).
				error(function(data, status) {
					$scope.data = data || "Request failed";
				});
			}

			$scope.opt = function(article) {
				console.log(article);
				$http({
					method: $scope.method,
					url: $scope.url,
					data: article,
					cache: $templateCache
				}).
				success(function(data, status) {
					if (status == '200') {
						console.log('in');
						$location.path('/article');
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
						 $scope.article.imgSrc=data;
					}
				}).
				error(function(data, status) {
					$scope.data = data || "Request failed";
				});
  			};
		}
	]);