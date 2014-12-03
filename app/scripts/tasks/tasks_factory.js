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
					console.log(task);
					var currentList = $cookieStore.get('currentList');
					total = 0;
					angular.forEach(task, function (item) {
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
				}; // end getTotal

				var updateListTimes = function (tasks, btnId) { // after setting task times, update to server
					var batchRequests = [];
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
        	console.log(params);
        	$http.post('https://api.parse.com/1/batch/', params, PARSE_HEADERS);
				}; // end update list times

				var dailyUpdate = function (list) {
					var user = $cookieStore.get('currentUser');
					PARSE_HEADERS = {
        		headers : {
          		'X-Parse-Application-Id': 'em1a4NnNesYbYgROEEOsuSpGbGuFkzazhHpyccNH',
			        'X-Parse-REST-API-Key': 'iLZI2A5USKe6XqNUhWNdHXSYJQApRNim3HpmA8YY',
          		'X-Parse-Session-Token' : user.sessionToken,
          		'Content-Type': 'application/json'
        		} // end headers
        	}; // end PARSE_HEADERS
        	var params = list.objectId;
        	var dataUpdate = {};
        	$http.put('https://api.parse.com/1/classes/Lists/' + params, PARSE_HEADERS);

				}; // end daily Update

				return {
					getTasks: getTasks,
					addTask: addTask,
					taskSum: taskSum,
					setListId: setListId,
					setTimes: setTimes,
					getTotal: getTotal,
					dailyUpdate: dailyUpdate,
					updateListTimes: updateListTimes
				};

			} // end function
		]); // end factory
}()); // end iif