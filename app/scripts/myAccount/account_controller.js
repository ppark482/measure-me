(function (){

	angular.module('FinalProject')
		.controller('AccountControl', ['$scope', 'AccountFactory',
			function($scope, AccountFactory){

				$scope.register = function (user) {
					AccountFactory.register(user);
				};

				$scope.login = function (user) {
					AccountFactory.login(user);
				};

			}]); // end controller

}()); // end iif