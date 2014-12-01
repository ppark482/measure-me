(function(){

	angular.module('FinalProject')
		.controller('TasksControl', ['$scope', 'TasksFactory', '$http', 'PARSE_HEADERS', '$location', '$cookieStore',
			function ($scope, TasksFactory, $http, PARSE_HEADERS, $location, $cookieStore) {

				TasksFactory.getTasks().success( function (data) {
					$scope.tasks = data.results;
				});

				$scope.addTask = function (task) {
					TasksFactory.addTask(task);
				};

			} // end function
		]); // end controller

}()); // end iif