(function(){

	angular.module('FinalProject', ['ngRoute', 'mm.foundation', 'ngCookies', 'angularMoment', 'tc.chartjs']) // setter

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
				templateUrl: 'scripts/accounts/register_template.html',
				controller: 'AccountControl'
			}); // end route
			$routeProvider.when('/login', {
				templateUrl: 'scripts/accounts/login_template.html',
				controller: 'AccountControl'
			}); // end route
			$routeProvider.when('/myconsole', {
				templateUrl: 'scripts/myUserInterface/my_console.html',
				controller: 'MyAccountControl'
			}); // end route
			$routeProvider.when('/project/:id', {
				templateUrl: 'scripts/projects/single_project_template.html',
				controller: 'SingleProjectControl',
			}); // end route

		}) // end config

		.directive('stopEvent', function () {
	    return {
	        restrict: 'A',
	        link: function (scope, element, attr) {
	            element.bind('click', function (e) {
	                e.stopPropagation();
	            });
	        } // end link
	    }; // end return
 		}); // end directive

}()); // end iif