(function(){

	angular.module('FinalProject')
		.controller('MyAccountControl', ['$scope', 'AccountFactory', '$cookieStore', '$filter',
			function($scope, AccountFactory, $cookieStore, $filter) {

				$scope.user = $cookieStore.get('currentUser');

				$scope.logout = function () {
					AccountFactory.logout();
				}; // end logout

				$scope.date = $filter('date')( Date.now(), 'medium');

			} // end function
		]); // end controller
}()); // end iif