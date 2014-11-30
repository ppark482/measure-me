(function(){

	angular.module('FinalProject')
		.controller('SingleProjectControl', ['$scope', '$cookieStore', 'ProjectFactory', '$location', '$routeParams', 
				'$http', 'ListsFactory',
			function($scope, $cookieStore, ProjectFactory, $location, $routeParams, $http, ListsFactory) {

				$scope.project = ProjectFactory.getSingle();

				$scope.consoleReturn = function () {
					ProjectFactory.consoleReturn();
				};

			} // end function

		]); // end controller

}()); // end iif