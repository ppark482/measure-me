(function(){

	angular.module('FinalProject')
		.controller('TasksControl', ['$scope', '$rootScope', 'TasksFactory', '$http', 'PARSE_HEADERS', '$location', '$cookieStore',
			function ($scope, $rootScope, TasksFactory, $http, PARSE_HEADERS, $location, $cookieStore) {

				var broadcastCalls = function () {
					TasksFactory.getTasks().success( function (data) {
						$scope.tasks = data.results;
						TasksFactory.setTimes($scope.tasks);
					});
				};

				$rootScope.$on('list:clicked', function () {
					broadcastCalls();
				});

				$rootScope.$on('newTask:added', function () {
					broadcastCalls();
				});

				$rootScope.$on('listTimes:updated', function () {
					broadcastCalls();
				});

				$rootScope.$on('task:deleted', function () {
					broadcastCalls();
				});

				$scope.addTask = function (task) {
					TasksFactory.addTask(task);
				};

				$scope.deleteTask = function (task) {
					TasksFactory.deleteTask(task);
				};

				$scope.taskSum = function (task) {
					TasksFactory.taskSum(task);
				};

				// $scope.setTimes = function (tasks, btnId) {
				// 	TasksFactory.setListId(btnId);
				// 	// allows for the sum of the task times
				// 	// to be injected into DOM
				// 	$scope.totalTime = TasksFactory.setTimes(tasks);
				// 	// TasksFactory.updateListTimes(tasks, btnId);
				// };

				$scope.updateTaskTimes = function (tasks) {
					TasksFactory.updateListTimes(tasks);
				};

				$scope.dailyUpdate = function (list) {
					TasksFactory.dailyUpdate(list);
				};

			} // end function
		]); // end controller

}()); // end iif