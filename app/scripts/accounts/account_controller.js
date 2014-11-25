(function (){

	angular.module('FinalProject')
		.controller('AccountControl', ['$scope', 'AccountFactory', '$rootScope',
			function($scope, AccountFactory, $rootScope){

				$scope.register = function (user) {
					AccountFactory.register(user);
				};

				$scope.login = function (user) {
					AccountFactory.login(user);
				};
			} // end function
		]); // end controller
}()); // end iif