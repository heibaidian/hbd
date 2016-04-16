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

.controller('material2Ctrl', ['$scope', '$http', '$templateCache','$routeParams','$filter',
	function($scope, $http, $templateCache,$routeParams,$filter) {
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
				vm.filteredItems = $filter('filter')(data, {title:$scope.q2,cate:$scope.q});
				
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
