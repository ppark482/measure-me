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
					var username = encodeURIComponent('username=' + user.username);
					var password = encodeURIComponent('password=' + user.password);
					console.log(username);
					$http.get(loginUrl, PARSE_HEADERS)
						.success( function () {
							console.log('logged in as ' + user);
							$location.path('/myaccount');
						} // end success
					); // end get
				}; // end login

				return {
					register: register,
					login: login
				}

			}]); // end of factory

}()); // end iif