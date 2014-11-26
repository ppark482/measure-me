(function(){

	angular.module('FinalProject')
		.controller('MyAccountControl', ['$scope', 'AccountFactory', '$cookieStore',
			function($scope, AccountFactory, $cookieStore) {

				$scope.user = $cookieStore.get('currentUser');

				$scope.logout = function () {
					AccountFactory.logout();
				}; // end logout

			} // end function
		]); // end controller
}()); // end iif