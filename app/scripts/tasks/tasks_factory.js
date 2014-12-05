(function(){

	angular.module('FinalProject')
		.factory('TasksFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location', '$cookieStore', 
			function ($rootScope, $http, PARSE_HEADERS, $location, $cookieStore) {

				var taskURL = 'https://api.parse.com/1/classes/Tasks/';

				var getTasks = function () {
					var currentUser = $cookieStore.get('currentUser');
					var currentList = $cookieStore.get('currentList');
					var query = '?'+'where={"listId":"'+currentList.objectId+'"}';
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

				var deleteTask = function (task) {
					var user = $cookieStore.get('currentUser');
					PARSE_HEADERS = {
        		headers : {
          		'X-Parse-Application-Id': 'em1a4NnNesYbYgROEEOsuSpGbGuFkzazhHpyccNH',
			        'X-Parse-REST-API-Key': 'iLZI2A5USKe6XqNUhWNdHXSYJQApRNim3HpmA8YY',
          		'X-Parse-Session-Token' : user.sessionToken,
          		'Content-Type': 'application/json'
        		} // end headers
        	}; // end PARSE_HEADERS
        	var id = task.objectId;
        	console.log(id);
        	return $http.delete(taskURL + id, PARSE_HEADERS)
        		.success( function () {
        			$rootScope.$broadcast('task:deleted');
        		});
				};

				var taskSum = function (task) {
					// dynamically sum up user inputs
					// for individual tasks to display
					// next to list titles
					var total = 0;
					angular.forEach(task, function (item) {
						total += parseInt(item.value);
					});
					return total;
					console.log(total);
				}; // end task Sum

				var listId;
				var setListId = function (id) {
					listId = id;
				};
				var total;
				var setTimes = function (task) {
					// populates existing task times
					var currentList = $cookieStore.get('currentList');
					total = 0;
					angular.forEach(task, function (item) {
						if (item.value === undefined) {
							item.value = 0;
						}
						total += parseInt(item.value);
					});
					$cookieStore.put('currentListTaskTotal', total);
					$rootScope.$broadcast('setTimes:set');
					return total;
				}; // end task Sum

				var getTotal = function () {
					return total;
				}; // end getTotal

				var updateListTimes = function (tasks) { // after setting task times, update to server
					var batchRequests = [];
					console.log(tasks);
					_.each(tasks, function (x) {
						batchRequests.push(

							{
							'method': 'PUT',
							'path'  : '/1/classes/Tasks/' + x.objectId,
							'body'	: {
								'value': x.value
							} // end body
						} // end object

							) // end push
					});
					var user = $cookieStore.get('currentUser');
					PARSE_HEADERS = {
        		headers : {
          		'X-Parse-Application-Id': 'em1a4NnNesYbYgROEEOsuSpGbGuFkzazhHpyccNH',
			        'X-Parse-REST-API-Key': 'iLZI2A5USKe6XqNUhWNdHXSYJQApRNim3HpmA8YY',
          		'X-Parse-Session-Token' : user.sessionToken,
          		'Content-Type': 'application/json'
        		} // end headers
        	}; // end PARSE_HEADERS
        	var params = {
        		'requests' : batchRequests
        	};
        	$http.post('https://api.parse.com/1/batch/', params, PARSE_HEADERS);
        	$rootScope.$broadcast('listTimes:updated');
				}; // end update list times

				return {
					getTasks: getTasks,
					addTask: addTask,
					deleteTask: deleteTask,
					taskSum: taskSum,
					setListId: setListId,
					setTimes: setTimes,
					getTotal: getTotal,
					updateListTimes: updateListTimes
				};

			} // end function
		]); // end factory
}()); // end iif