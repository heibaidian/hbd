angular.module('myAppList.material', ['ngRoute','ng-file-model'])
	.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.when('/', {
				templateUrl: 'js/aj2/material/list.html',
				controller: 'material2Ctrl'
			}).when('/limit/:pagesize/:start', {
				templateUrl: 'js/aj2/material/list.html',
				controller: 'material2Ctrl'
			}).when('/tuiguang', {
				templateUrl: 'js/aj2/material/tuiguang.html',
				controller: 'material3Ctrl'
			});
		}
	])

.controller('material2Ctrl', ['$scope', '$http', '$templateCache','$routeParams','$filter',
	function($scope, $http, $templateCache,$routeParams,$filter) {
		$http({
			method: 'GET',
			url: 'classes',
			cache: $templateCache
		}).
		success(function(data, status) {
			$scope.sort = data;
		}).
		error(function(data, status) {
			$scope.sort = data || "Request failed";
		});

		var vm=this;
		vm.figureOutItemsToDisplay=figureOutItemsToDisplay;
		
	    vm.pagedItems = [];
	    vm.itemsPerPage = 18;
	    $scope.currentPage = vm.currentPage = 1;

	    function figureOutItemsToDisplay() {
	    	$http({
				method: 'GET',
				url: 'material/find'
			}).
			success(function(data) {
				vm.filteredItems = $filter('filter')(data, {title:$scope.q2,classes:{_id:$scope.q}});
				
				$scope.arr=[];
				var len=vm.filteredItems.length%vm.itemsPerPage>0?parseInt(vm.filteredItems.length/vm.itemsPerPage)+1:parseInt(vm.filteredItems.length/vm.itemsPerPage);
				for (var i = 1; i <=len; i++) 
					$scope.arr.push(i);
				
				vm.filterLength = vm.filteredItems.length;
		      	var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
		      	var end = begin + vm.itemsPerPage;

		      	if(vm.filterLength<begin){
		      		$scope.pagedItems = vm.filteredItems.slice(0, vm.itemsPerPage);
		      		$scope.currentPage = vm.currentPage = 1;
		      	}else
		      		$scope.pagedItems = vm.filteredItems.slice(begin, end);
			})
	    }

	    $scope.pageChanged=function() {
	      vm.figureOutItemsToDisplay();
	    }

	    $scope.changePage=function(d) {
	      $scope.currentPage = vm.currentPage = d;
	    }

	    $scope.$watch('currentPage', vm.figureOutItemsToDisplay);
	}
])
.controller('material3Ctrl', ['$scope', '$http', '$templateCache', '$routeParams', '$location',
		function($scope, $http, $templateCache, $routeParams, $location) {
			$http({
				method: 'GET',
				url: 'classes'
			}).
			success(function(data, status) {
				$scope.sort = data;
			}).
			error(function(data, status) {
				$scope.sort = data || "Request failed";
			});

			var obj={};
			$scope.material={};
			$scope.imgSrc='/img/update.jpg';
			$scope.picArr=[];

			$scope.submit = function(obj){
			  $http({
					method: 'post',
					url: "/file/upload",
					data: JSON.stringify(obj.testFile)
				}).
				success(function(data, status) {
					if (status == '200') {
						$scope.material.imgSrc=data;
						$scope.picArr.push(data);
					}
				}).
				error(function(data, status) {
					$scope.data = data || "Request failed";
				});
  			};

  			$scope.opt = function(material) {
  				var imgs="";
  				for(var i=0;i<$scope.picArr.length;i++)
  					imgs+='<br /><img src="'+$scope.picArr[i]+'" />';
  				material.content=material.introduction+"<br />"+"手机号："+material.tel+"<br />"+"地址："+material.address+imgs;
  				material.pass=0;
				$http({
					method: "post",
					url: "material/create",
					data: material
				}).
				success(function(data, status) {
					if (status == '200') {
						$location.path('/');
					}

				}).
				error(function(data, status) {
					$scope.data = data || "Request failed";
				});
			};
		}
	]);
