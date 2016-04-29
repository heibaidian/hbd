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

.controller('tel2Ctrl', ['$scope', '$http', '$templateCache','$routeParams','$filter',
	function($scope, $http, $templateCache,$routeParams,$filter) {
		// var url='';
		// if(typeof($routeParams.start)== 'undefined' || typeof($routeParams.pagesize)== 'undefined')
		// 	url='tel/find/limit/18/0';
		// else
		// 	url='tel/find/limit/'+$routeParams.pagesize+'/'+$routeParams.start;

		// $http({
		// 	method: 'GET',
		// 	url: url,
		// 	cache: $templateCache
		// }).
		// success(function(data, status) {
		// 	$scope.list = data;
		// }).
		// error(function(data, status) {
		// 	$scope.list = data || "Request failed";
		// });

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

		var vm=this;
		vm.figureOutItemsToDisplay=figureOutItemsToDisplay;
		
	    vm.pagedItems = [];
	    vm.itemsPerPage = 18;
	    $scope.currentPage = vm.currentPage = 1;

	    function figureOutItemsToDisplay() {
	    	$http({
				method: 'GET',
				url: 'tel/find'
			}).
			success(function(data) {
				vm.filteredItems = $filter('filter')(data, {area:$scope.q2,cate:$scope.q});
				
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
]);