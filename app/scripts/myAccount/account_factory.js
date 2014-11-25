(function(){

	angular.module('FinalProject')
		.factory('AccountFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location',
			function($rootScope, $http, PARSE_HEADERS, $location){

				var usersUrl = 'https://api.parse.com/1/users/';
				var loginUrl = 'https://api.parse.com/1/login/';

				var register = function (user) {
					$http.post(usersUrl, user, PARSE_HEADERS)
						.success( function () {
							$location.path('/');
						} // end success
					); // end post
				}; // end register

				var login = function (user) {
					var params = 'username='+user.username+'&password='+user.password;
          $http.get('https://api.parse.com/1/login/?'+params, PARSE_HEADERS)
            .success( function (data) {
              console.log(data);
          });
				}; // end login

				return {
					register: register,
					login: login
				}

			}]); // end of factory

}()); // end iif