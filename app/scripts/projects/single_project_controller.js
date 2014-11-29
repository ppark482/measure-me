(function(){

	angular.module('FinalProject')
		.controller('SingleProjectControl', ['$scope', '$cookieStore', 'ProjectFactory', '$location', '$routeParams', '$http',
			function($scope, $cookieStore, ProjectFactory, $location, $routeParams, $http) {

				$scope.project = ProjectFactory.getSingle();
				console.log($scope.project);

			} // end function

		]); // end controller

}()); // end iif