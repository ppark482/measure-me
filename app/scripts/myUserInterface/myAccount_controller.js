(function(){

	angular.module('FinalProject')
		.controller('MyAccountControl', ['$scope', 'AccountFactory',
			function($scope, AccountFactory) {
				$scope.user = sessionStorage;

				$scope.logout = function () {
					AccountFactory.logout();
				}; // end logout

			} // end function
		]); // end controller
}()); // end iif