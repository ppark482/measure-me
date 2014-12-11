(function(){

	angular.module('FinalProject')
		.controller('MyAccountControl', ['$scope', 'AccountFactory', '$cookieStore', '$filter', 'ProjectFactory', 'ConsoleFactory',
			function($scope, AccountFactory, $cookieStore, $filter, ProjectFactory, ConsoleFactory) {

				$scope.user = $cookieStore.get('currentUser');

				$scope.logout = function () {
					AccountFactory.logout();
				}; // end logout

			} // end function
		]); // end controller
}()); // end iif