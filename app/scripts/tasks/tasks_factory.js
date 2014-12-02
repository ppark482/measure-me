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
				var total;
				var setTimes = function (task) {
					// dynamically sum up user inputs
					// for individual tasks to display
					// next to list titles
					var listTasks = _.where(task, {listId : listId});
					console.log(listTasks)
					total = 0;
					angular.forEach(listTasks, function (item) {
						if (item.value === undefined) {
							item.value = 0;
						}
						total += parseInt(item.value);
					});
					$rootScope.$broadcast('setTimes:set');
					return total;
				}; // end task Sum

				var getTotal = function () {
					return total;
				};

				var updateListTimes = function (tasks, btnId) {
					var user = $cookieStore.get('currentUser');
					PARSE_HEADERS = {
        		headers : {
          		'X-Parse-Application-Id': 'em1a4NnNesYbYgROEEOsuSpGbGuFkzazhHpyccNH',
			        'X-Parse-REST-API-Key': 'iLZI2A5USKe6XqNUhWNdHXSYJQApRNim3HpmA8YY',
          		'X-Parse-Session-Token' : user.sessionToken,
          		'Content-Type': 'application/json'
        		} // end headers
        	}; // end PARSE_HEADERS
        	// need to batch updateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        	var params = 
        	$http.put('https://api.parse.com/1/batch' + params, PARSE_HEADERS);
				}; // end update list times

				return {
					getTasks: getTasks,
					addTask: addTask,
					taskSum: taskSum,
					setListId: setListId,
					setTimes: setTimes,
					getTotal: getTotal
				};

			} // end function
		]); // end factory
}()); // end iif