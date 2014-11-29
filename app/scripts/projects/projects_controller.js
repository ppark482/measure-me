(function(){

	angular.module('FinalProject')
		.controller('ProjectsControl', ['$scope', '$cookieStore', 'ProjectFactory',
			function($scope, $cookieStore, ProjectFactory){

				ProjectFactory.getProjects()
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