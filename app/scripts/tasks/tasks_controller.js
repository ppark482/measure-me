(function(){

	angular.module('FinalProject')
		.controller('TasksControl', ['$scope', '$rootScope', 'TasksFactory', 'ExtendedTasksFactory', '$http', 'PARSE_HEADERS', '$location', '$cookieStore',
			function ($scope, $rootScope, TasksFactory, ExtendedTasksFactory, $http, PARSE_HEADERS, $location, $cookieStore) {

				var broadcastCalls = function () {
					TasksFactory.getTasks().success( function (data) {
						console.log(data.results);
						$scope.tasks = data.results;
						$('.toBeCleared').val('');
						// data.results is an array of tasks that correspond
						// to the clicked list
						// TasksFactory.setTimes(data.results);
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

				$rootScope.$on('taskHours:updated', function () {
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

				$scope.updateTaskTimes = function (tasks) {
					TasksFactory.updateListTimes(tasks);
				};

				$scope.dailyUpdate = function (list) {
					TasksFactory.dailyUpdate(list);
				};

				$scope.goToEdit = function () {
					$scope.timeSet = true;	
				};

				$scope.setInitialHours = function (tasks) {
					$scope.timeSet = false;
					ExtendedTasksFactory.setInitialHours(tasks);
				};

				$scope.putHoursLeft = function (task) {
					if (task.hoursLeft > 0) {
						return true;
					} else if (task.hoursLeft <= 0) {
						return false;
					} else if (!task.hoursLeft) {
						return false;
					} else {return true;}
				};
				$scope.putInitialHours = function (task) {
					if (task.hoursLeft > 0) {
						return false;
					} else if (task.hoursLeft <= 0) {
						return false;
					}
					else if (!task.hoursLeft) {
						return true;
					} else {return false;}
				};

				$scope.hoursLeftComplete = function (task) {
					if (task.hoursLeft <= 0)
						return true;
				};

				$scope.submitTodaysTimes = function (tasks) {
					ExtendedTasksFactory.submitTodaysTimes(tasks);
				};

			} // end function
		]); // end controller

}()); // end iif