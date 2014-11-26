(function(){

	angular.module('FinalProject')
		.factory('AccountFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location', '$cookieStore',
			function($rootScope, $http, PARSE_HEADERS, $location, $cookieStore){

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
            	$cookieStore.put('currentUser', data)
            	// sessionStorage.setItem('username', data.username);
            	// sessionStorage.setItem('email', data.email);
            	// sessionStorage.setItem('objectId', data.objectId);
            	// sessionStorage.setItem('sessionToken', data.sessionToken);
            	return checkUser();
          });
				}; // end login

				var logout = function () {
					$cookieStore.remove('currentUser');
					return checkUser();
				}; // end logout

				var checkUser = function () {
					var user = $cookieStore.get('currentUser');
					// console.log(user);
					if (user !== undefined) {
						console.log('User is ' + user.username);
						$location.path('/myconsole');
					} else {
						console.log('No Current User logged in');
						$location.path('/login');
					}
				}; // end checkUser

				return {
					register: register,
					login: login,
					logout: logout,
					checkUser: checkUser
				}

			}]); // end of factory

}()); // end iif