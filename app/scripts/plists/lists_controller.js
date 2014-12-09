(function(){

	angular.module('FinalProject')
		.controller('ListsControl', ['$scope', '$cookieStore', 'ListsFactory', 'TasksFactory', '$rootScope',
			'ProjectFactory', '$location', '$routeParams', '$http', 
			function($scope, $cookieStore, ListsFactory, TasksFactory, $rootScope, ProjectFactory, $location, $routeParams, $http) {

				$rootScope.$on('newList:added', function (event, args) {
					ListsFactory.getLists().success(function(results) {
						setLists(results);
					}); // end success
				});

				ListsFactory.getLists()
					.success(function(results) {
						ListsFactory.getProjectLists()
							.success(function (results) {
								ListsFactory.getListTasks(results)
									.success( function () {
										setLists(results);	
									}); // end success
							}); // end success
					}); // end success

				var setLists = function (results) {
					var currentProject = $cookieStore.get('currentProject');
					var results = results.results;
					// $scope.lists = _.where(results, {
					// 	projectId: currentProject.objectId
					// });
					// console.log($scope.lists);
					var tempLists = _.where(results, {
						projectId: currentProject.objectId
					});
					// console.log(tempLists);
					var totals = $cookieStore.get('currentCollection');
					// console.log(totals);
					if (tempLists) {
						_.each(tempLists, function (x) {
							var match = _.where(totals, {
								id: x.objectId
							});
							x.totalHours = match[0]['totalHours'];
							x.hoursLeft = match[0]['hoursLeft'];
						}); // end of each
						$scope.lists = tempLists;
					};
				}; // end setLists

				$scope.addList = function (list) {
					ListsFactory.addList(list);
				}; // end createlist

				$scope.clickList = function (list) {
					ListsFactory.clickList(list);
					$rootScope.$broadcast('list:clicked');
				}; // end clickList

				$scope.deleteList = function (id, index) {
					ListsFactory.deleteList(id).success( function () {
						$scope.lists.splice(index, 1);
					});
				}; // end deleteList

			} // end function
		]); // end controller
}()); // end iif