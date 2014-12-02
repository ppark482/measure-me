(function(){

	angular.module('FinalProject')
		.factory('TasksFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location', '$cookieStore', 
			function ($rootScope, $http, PARSE_HEADERS, $location, $cookieStore) {

				var taskURL = 'https://api.parse.com/1/classes/Tasks/';

				var getTasks = function () {
					var currentUser = $cookieStore.get('currentUser');
					var query = '?'+'where={"userId":"'+currentUser.objectId+'"}';
          return $http.get(taskURL + query, PARSE_HEADERS);
				};

				var addTask = function (task) {
					var currentList = $cookieStore.get('currentList');
					var currentProject = $cookieStore.get('currentProject');
					var user = $cookieStore.get('currentUser');
					var userId = {};
					userId[user.objectId] = {
					  'read': true,
					  'write': true
					};
					task.ACL = $.extend(userId, { '*': {'read' : true}}); // end set ACL
					task.userId = user.objectId;
					task.projectId = currentProject.objectId;
					task.listId = currentList.objectId;
					$http.post(taskURL, task, PARSE_HEADERS)
						.success( function () {
							$('.toBeCleared').val('');
							$rootScope.$broadcast('newTask:added');
						});

				}; // end addTask

				var taskSum = function (task) {
					// dynamically sum up user inputs
					// for individual tasks to display
					// next to list titles
					var total = 0;
					angular.forEach(task, function (item) {
						total += parseInt(item.value);
					});
					return total;
				}; // end task Sum

				var listId;
				var setListId = function (id) {
					listId = id;
				};

				var setTimes = function (task) {
					// dynamically sum up user inputs
					// for individual tasks to display
					// next to list titles
					// console.log(listId);
					// console.log(task);
					var listTasks = _.where(task, {listId : listId});
					console.log(listTasks)
					var total = 0;
					angular.forEach(listTasks, function (item) {
						total += parseInt(item.value);
					});
					console.log(total);
				}; // end task Sum

				return {
					getTasks: getTasks,
					addTask: addTask,
					taskSum: taskSum,
					setListId: setListId,
					setTimes: setTimes
				};

			} // end function
		]); // end factory
}()); // end iif