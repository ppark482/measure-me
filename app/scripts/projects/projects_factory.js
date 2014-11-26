(function(){

	angular.module('FinalProject')
		.factory('ProjectFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location', '$cookieStore',
			function($rootScope, $http, PARSE_HEADERS, $location, $cookieStore) {

				var projectURL = 'https://api.parse.com/1/classes/Project/';

				// var getProjects = function (project) {
				// 	// Retrieve signed in user's projects
				// 	return $http.get(projectURL, PARSE_HEADERS);
				// };

				var addProject = function (project) {
					// from MainModalControl
					console.log(project);
					var user = $cookieStore.get('currentUser');
					var userId = {};
					userId[user.objectId] = {
					  'read': true,
					  'write': true
					};
					project.ACL = $.extend(userId, { '*': {'read' : true}}) // end set ACL
					console.log(project.ACL);
					$http.post(projectURL, project, PARSE_HEADERS)
						.success(function (){
							console.log('Project Added');
							$location.path('/myconsole');
						}); // end success
				}; // end addProject


				return {
					addProject: addProject
				}

			} // end function
		]); // end factory

}()); // end iif