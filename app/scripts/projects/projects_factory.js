(function(){

	angular.module('FinalProject')
		.factory('ProjectFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location', '$cookieStore',
			function($rootScope, $http, PARSE_HEADERS, $location, $cookieStore) {

				var projectURL = 'https://api.parse.com/1/classes/Project/';

				var getProjects = function (project) {
					// Need to get from server current user's projects
					return $http.get(projectURL, PARSE_HEADERS);
				}; // end getProject

				var addProject = function (project) {
					// from MainModalControl
					var user = $cookieStore.get('currentUser');
					var userId = {};
					userId[user.objectId] = {
					  'read': true,
					  'write': true
					};
					project.ACL = $.extend(userId, { '*': {'read' : true}}); // end set ACL
					project.userId = user.objectId;
					$http.post(projectURL, project, PARSE_HEADERS)
						.success(function (){
							console.log('Project Added');
							$location.path('/myconsole');
						}); // end success
				}; // end addProject


				return {
					getProjects: getProjects,
					addProject: addProject,
					getProjects: getProjects
				}

			} // end function
		]); // end factory

}()); // end iif