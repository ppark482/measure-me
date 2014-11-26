(function(){

	angular.module('FinalProject')
		.factory('AccountFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location',
			function($rootScope, $http, PARSE_HEADERS, $location){

				var userInfo;
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
            	sessionStorage.setItem('username', data.username);
            	sessionStorage.setItem('email', data.email);
            	sessionStorage.setItem('objectId', data.objectId);
            	sessionStorage.setItem('sessionToken', data.sessionToken);
              $location.path('/myconsole');
          });
				}; // end login

				var logout = function () {
					sessionStorage.clear();
					$location.path('/login');
				}; // end logout

				return {
					register: register,
					login: login,
					logout: logout
				}

			}]); // end of factory

}()); // end iif