(function(){

	angular.module('FinalProject')
		.controller('MyAccountControl', ['$scope', 'MyAccountFactory',
			function($scope, MyAccountFactory) {
				console.log(App.user);
				$scope.user = App.user;
				

			} // end function
		]); // end controller
}()); // end iif