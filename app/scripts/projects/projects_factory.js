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
						.then(function (){
							console.log('Project Added');
							$rootScope.$broadcast('project:added');
							$location.path('/myconsole');
						}); // end success
				}; // end addProject

				var consoleReturn = function () {
					$location.path('/myconsole');
				}; // end consoleReturn

				return {
					getProjects: getProjects,
					addProject: addProject,
					consoleReturn: consoleReturn
				} // end returns

			} // end function
		]); // end factory

}()); // end iif