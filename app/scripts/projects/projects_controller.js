(function(){

	angular.module('FinalProject')
		.controller('ProjectsControl', ['$scope', '$rootScope', '$cookieStore', 'ProjectFactory', '$location', 'ListsFactory', 'ConsoleFactory',
			function ($scope, $rootScope, $cookieStore, ProjectFactory, $location, ListsFactory, ConsoleFactory){

				$rootScope.$on('project:added', function () {
					ProjectFactory.getProjects()
					.success(function(results) {
						var user = $cookieStore.get('currentUser');
						var results = results.results;
						$scope.projects = _.where(results, {
							userId: user.objectId
						});
					}); // end success
				}); // end on

				ConsoleFactory.getTasks();

				ProjectFactory.getProjects()
					// after getting all projects from server
					// look through all projects for user specific projects
					// allow controller to pass data to template
					.success(function (results) {
						var user = $cookieStore.get('currentUser');
						var results = results.results;
						$scope.projects = _.where(results, {
							userId: user.objectId
						});
					}); // end success

				$scope.clickProject = function (project) {
					$cookieStore.put('currentProject', project);
					$location.path('/project/' + project.objectId);
					ListsFactory.getProjectLists()
						.success(function (results) {
							ListsFactory.getListTasks(results);
						});
				}; // end clickProject

				$scope.completed = function (project) {
					console.log(project);
					if(project.hours/project.hoursCompleted === 1) {
						return true;
					} else {
						return false;
					};
				};

			} // end function
		]); // end controller
}()); // end iff