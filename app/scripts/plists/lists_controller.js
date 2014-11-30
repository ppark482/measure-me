(function(){

	angular.module('FinalProject')
		.controller('ListsControl', ['$scope', '$cookieStore', 'ListsFactory', 
			'ProjectFactory', '$location', '$routeParams', '$http', 
			function($scope, $cookieStore, ListsFactory, ProjectFactory, $location, $routeParams, $http) {

				ListsFactory.getLists()
					// after getting all projects from server
					// look through all projects for user specific projects
					// allow controller to pass data to template
					.success(function(results) {
						var currentProject = ProjectFactory.getSingle();
						var results = results.results;
						$scope.lists = _.where(results, {
							projectId: currentProject.objectId
						});
					}); // end success

				$scope.addList = function (list) {
					ListsFactory.addList(list);
				}; // end createlist

			} // end function
		]); // end controller
}()); // end iif