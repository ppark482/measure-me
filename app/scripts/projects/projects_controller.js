(function(){

	angular.module('FinalProject')
		.controller('ProjectsControl', ['$scope', '$cookieStore', 'ProjectFactory',
			function($scope, $cookieStore, ProjectFactory){

				ProjectFactory.getProjects()
					.success(function(results) {
						var user = $cookieStore.get('currentUser');
						var results = results.results;
						console.log(results[1].userId);
						$scope.usersProjects = _.where(results, {
							userId: user.objectId
						});
						console.log($scope.usersProjects);
					});

			} // end function
		]); // end controller
}()); // end iff