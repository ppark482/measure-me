(function(){

	angular.module('FinalProject')
		.controller('ListsControl', ['$scope', '$cookieStore', 'ListsFactory', '$rootScope',
			'ProjectFactory', '$location', '$routeParams', '$http', 
			function($scope, $cookieStore, ListsFactory, $rootScope, ProjectFactory, $location, $routeParams, $http) {

				$rootScope.$on('newList:added', function (event, args) {
					ListsFactory.getLists().success(function(results) {
						var currentProject = $cookieStore.get('currentProject');
						var results = results.results;
						$scope.lists = _.where(results, {
							projectId: currentProject.objectId
						});
					}); // end success
				});

				ListsFactory.getLists()
					// after getting all projects from server
					// look through all projects for user specific projects
					// allow controller to pass data to template
					.success(function(results) {
						var currentProject = $cookieStore.get('currentProject');
						var results = results.results;
						$scope.lists = _.where(results, {
							projectId: currentProject.objectId
						});
					}); // end success

				$scope.addList = function (list) {
					ListsFactory.addList(list);
				}; // end createlist

				$scope.clickList = function (list) {
					ListsFactory.clickList(list);
				}; // end clickList

				$scope.deleteList = function (id, index) {
					ListsFactory.deleteList(id).success( function () {
						$scope.lists.splice(index, 1);
					});
				}; // end deleteList

			} // end function
		]); // end controller
}()); // end iif