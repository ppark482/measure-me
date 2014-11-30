(function(){

	angular.module('FinalProject')
		.controller('ListsControl', ['$scope', '$cookieStore', 'ListsFactory', '$location', '$routeParams', '$http', 
			function($scope, $cookieStore, ListsFactory, $location, $routeParams, $http) {

				$scope.addList = function (list) {
					ListsFactory.addList(list);
				}; // end createlist

			} // end function
		]); // end controller
}()); // end iif