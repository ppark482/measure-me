(function(){

	angular.module('FinalProject')
		.controller('ProjectsControl', ['$scope', '$cookieStore', 'ProjectFactory',
			function($scope, $cookieStore, ProjectFactory){

				ProjectFactory.getProjects()
					// after getting all projects from server
					// look through all projects for user specific projects
					// allow controller to pass data to template
					.success(function(results) {
						var user = $cookieStore.get('currentUser');
						var results = results.results;
						$scope.projects = _.where(results, {
							userId: user.objectId
						});
					}); // end success

			} // end function
		]); // end controller
}()); // end iff