(function(){

	angular.module('FinalProject')
		.controller('SingleProjectControl', ['$scope', '$cookieStore', 'ProjectFactory', '$location', '$routeParams', 
				'$http', 'ListsFactory',
			function($scope, $cookieStore, ProjectFactory, $location, $routeParams, $http, ListsFactory) {

				$scope.project = $cookieStore.get('currentProject');

				$scope.user = $cookieStore.get('currentUser');

				$scope.consoleReturn = function () {
					$cookieStore.remove('currentProject');
					$cookieStore.remove('currentList');
					$cookieStore.remove('currentCollection');
					ProjectFactory.consoleReturn();
				};

			} // end function

		]); // end controller

}()); // end iif