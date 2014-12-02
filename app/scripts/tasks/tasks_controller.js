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

				$scope.taskSum = function (task) {
					TasksFactory.taskSum(task);
				};

				$scope.setTimes = function (tasks, btnId) {
					TasksFactory.setListId(btnId);
					// allows for the sum of the task times
					// to be injected into DOM
					$scope.totalTime = TasksFactory.setTimes(tasks);
					TasksFactory.updateListTimes(tasks, btnId);
				};

				$scope.dailyUpdate = function (list) {
					TasksFactory.dailyUpdate(list);
				};

			} // end function
		]); // end controller

}()); // end iif