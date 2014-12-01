(function(){

	angular.module('FinalProject')
		.controller('TasksControl', ['$scope', '$rootScope', 'TasksFactory', '$http', 'PARSE_HEADERS', '$location', '$cookieStore',
			function ($scope, $rootScope, TasksFactory, $http, PARSE_HEADERS, $location, $cookieStore) {

				$rootScope.$on('newTask:added', function () {
					TasksFactory.getTasks().success( function (data) {
					$scope.tasks = data.results;
					});
				});

				TasksFactory.getTasks().success( function (data) {
					$scope.tasks = data.results;
				});

				$scope.addTask = function (task) {
					TasksFactory.addTask(task);
				};

			} // end function
		]); // end controller

}()); // end iif