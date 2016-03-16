angular.module('myApp.design', ['ngRoute','ng-file-model'])
	.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.when('/design', {
				templateUrl: 'js/aj/design/index.html',
				controller: 'design1Ctrl'
			}).when('/design/opt', {
				templateUrl: 'js/aj/design/opt.html',
				controller: 'design2Ctrl'
			}).when('/design/opt/:id', {
				templateUrl: 'js/aj/design/opt.html',
				controller: 'design2Ctrl'
			}).when('/design/opt2/:id', {
				templateUrl: 'js/aj/design/opt2.html',
				controller: 'design3Ctrl'
			}).when('/design/opt3/:id', {
				templateUrl: 'js/aj/design/opt3.html',
				controller: 'design4Ctrl'
			});
		}
	])

.controller('design1Ctrl', ['$scope', '$http', '$templateCache',
	function($scope, $http, $templateCache) {
		$scope.load = function() {
			$http({
				method: 'GET',
				url: 'design/find',
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
				url: 'design/del/' + id,
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

		$scope.delsm = function(id,d) {
			console.log(d);
			$http({
				method: 'post',
				url: 'design/update/stylemore/pull/' + id,
				data: {'_id':d},
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
	.controller('design2Ctrl', ['$scope', '$http', '$templateCache', '$routeParams', '$location',
		function($scope, $http, $templateCache, $routeParams, $location) {
			$scope.method = "post";
			$scope.url = "design/create";
			$scope.optname = "添加";

			if ($routeParams.id != undefined) {
				$http({
					method: 'get',
					url: 'design/find/' + $routeParams.id,
					cache: false
				}).
				success(function(data, status) {
					$scope.design = data;
					$scope.url = 'design/update/' + $routeParams.id;
					$scope.optname = "修改";
				}).
				error(function(data, status) {
					$scope.data = data || "Request failed";
				});
			}

			$scope.opt = function(design) {
				console.log(design);
				$http({
					method: $scope.method,
					url: $scope.url,
					data: design,
					cache: $templateCache
				}).
				success(function(data, status) {
					if (status == '200') {
						console.log('in');
						$location.path('/design');
					}

				}).
				error(function(data, status) {
					$scope.data = data || "Request failed";
				});
			}
		}
	])
	.controller('design3Ctrl', ['$scope', '$http', '$templateCache', '$routeParams', '$location',
		function($scope, $http, $templateCache, $routeParams, $location) {
			$http({
				method: 'get',
				url: 'design/find/picurl/' + $routeParams.id,
				cache: false
				}).
				success(function(data, status) {
					console.log(data[0].stylemore[0]);
					$scope.design = data[0].stylemore[0];
				}).
				error(function(data, status) {
					$scope.data = data || "Request failed";
			});

			$scope.update = function(design) {
				console.log(design);
				$http({
					method:'post',
					url: 'design/update/stylemore/ptitle/'+$routeParams.id,
					data: design,
					cache: false
				}).
				success(function(data, status) {
					if (status == '200') {
						console.log('in');
						$location.path('/design');
					}
				}).
				error(function(data, status) {
					$scope.data = data || "Request failed";
				});
			};

			$scope.del = function(d) {
				console.log(d);
				$http({
					method:'post',
					url: 'design/update/stylemore/picurl/pull/'+$routeParams.id,
					data: {'d':d},
					cache: false
				}).
				success(function(data, status) {
					if (status == '200') {
						$location.path('/design');
					}
				}).
				error(function(data, status) {
					$scope.data = data || "Request failed";
				});
			};

			var obj = {};
			$scope.submit = function(obj) {
				$http({
					method: 'post',
					url: "/file/upload",
					data: JSON.stringify(obj.testFile)
				}).
				success(function(data, status) {
					if (status == '200') {
						console.log(data);
						$scope.design.imgSrc = data;
						$http({
							method:'post',
							url: 'design/update/stylemore/picurl/push/'+$routeParams.id,
							data: $scope.design,
							cache: false
						}).
						success(function(data, status) {
							if (status == '200') {
							}
						}).
						error(function(data, status) {
							$scope.data = data || "Request failed";
						});
					}
				}).
				error(function(data, status) {
					$scope.data = data || "Request failed";
				});
			};
		}
	])
.controller('design4Ctrl', ['$scope', '$http', '$templateCache', '$routeParams', '$location',
		function($scope, $http, $templateCache, $routeParams, $location) {
			$scope.optname = "添加";
			$scope.opt = function(ptitle) {
				console.log(ptitle);
				$http({
					method: 'post',
					url: 'design/update/stylemore/push/'+ $routeParams.id,
					data: {'ptitle':ptitle},
					cache: $templateCache
				}).
				success(function(data, status) {
					if (status == '200') {
						console.log('in');
						$location.path('/design');
					}
				}).
				error(function(data, status) {
					$scope.data = data || "Request failed";
				});
			}
		}
])
;