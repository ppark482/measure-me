(function(){

	angular.module('FinalProject')
		.controller('TasksControl', ['$scope', '$rootScope', 'TasksFactory', 'ExtendedTasksFactory', '$http', 'PARSE_HEADERS', '$location', '$cookieStore',
			function ($scope, $rootScope, TasksFactory, ExtendedTasksFactory, $http, PARSE_HEADERS, $location, $cookieStore) {

				var broadcastCalls = function () {
					TasksFactory.getTasks().success( function (data) {
						var results = data.results;
						_.each(results, function (x) {
							x.hoursToday = '';
						});
						$scope.tasks = results;
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
					$('.toBeCleared').val('');
					$scope.timeSet = true;	
				};

				$scope.setInitialHours = function (tasks) {
					$scope.timeSet = false;
					$('.toBeCleared').trigger('input');
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
					}	else if (!task.hoursLeft) {
						return true;
					} else {return false;}
				};

				$scope.hoursLeftComplete = function (task) {
					if (task.hoursLeft <= 0)
						return true;
				};

				$scope.submitTodaysTimes = function (tasks) {
					$('.hoursCompletedToday').trigger('input');
					$('.hoursCompletedToday').val('');
					ExtendedTasksFactory.submitTodaysTimes(tasks);
				};

			} // end function
		]); // end controller

}()); // end iif