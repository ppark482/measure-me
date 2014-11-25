(function(){

	angular.module('FinalProject', ['ngRoute', 'mm.foundation']) // setter

		.constant('PARSE_HEADERS', {
      headers: {
        'X-Parse-Application-Id': 'em1a4NnNesYbYgROEEOsuSpGbGuFkzazhHpyccNH',
        'X-Parse-REST-API-Key': 'iLZI2A5USKe6XqNUhWNdHXSYJQApRNim3HpmA8YY',
        'Content-Type': 'application/json'
      }
    }) // end constant
		.config( function($routeProvider) {
			$routeProvider.when('/', {
				templateUrl: 'templates/home.html',
				controller: 'AccountControl'
			}); // end route
			$routeProvider.when('/register', {
				templateUrl: 'templates/register_template.html',
				controller: 'AccountControl'
			}); // end route
			$routeProvider.when('/login', {
				templateUrl: 'templates/login_template.html',
				controller: 'AccountControl'
			}); // end route

		}); // end config

}()); // end iif