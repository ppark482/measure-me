(function(){

	angular.module('FinalProject')
		.factory('ExtendedTasksFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location', '$cookieStore', 'TasksFactory',
			function ($rootScope, $http, PARSE_HEADERS, $location, $cookieStore, TasksFactory){

				var taskURL = 'https://api.parse.com/1/classes/Tasks/';
				var historyURL = 'https://api.parse.com/1/classes/TasksHistory/'

				var setInitialHours = function (tasks) {
					var batchRequests = [];
					_.each(tasks, function (x) {
						if (!x.hoursLeft) {
							x.hoursLeft = x.initialHours;
							} else {x.hoursLeft = x.hoursLeft + x.initialHours};
						batchRequests.push(

							{
							'method': 'PUT',
							'path'  : '/1/classes/Tasks/' + x.objectId,
							'body'	: {
								'initialHours': x.initialHours,
								'hoursLeft'		: x.hoursLeft
							} // end body
						} // end object

							) // end push
					});
					console.log(batchRequests);
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
        	$http.post('https://api.parse.com/1/batch/', params, PARSE_HEADERS).success( function() {
        		$rootScope.$broadcast('listTimes:updated');	
        	});
				}; // end set initial hours

				var submitTodaysTimes = function (tasks) {
					// need to update current tasks
					// also need to post to Tasks History to track
					var user = $cookieStore.get('currentUser');
					var project = $cookieStore.get('currentProject');
					var list = $cookieStore.get('currentList');
					var batchRequests = [];
					_.each(tasks, function (x) {
						console.log(x);
						if (!x.hoursLeft) {
							x.hoursLeft = x.initialHours;
						} else {x.hoursLeft = x.hoursLeft - x.hoursToday};
						batchRequests.push(

							{
							'method': 'POST',
							'path'  : '/1/classes/TasksHistory',
							'body'	: {
								'userId' 				: user.objectId,
								'projectId' 		: project.objectId,
								'listId' 				: list.objectId,
								'initialHours'	: x.initialHours,
								'hoursToday'		: x.hoursToday,
								'hoursLeft'			: x.hoursLeft
								} // end body
							} // end object

						) // end push
					});
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
        	$('.toBeCleared').val('');
        	updateCurrentTask(tasks, user, project, list, PARSE_HEADERS);
				}; // end submitTodaysTimes

				var updateCurrentTask = function (tasks, user, project, list, PARSE_HEADERS) {
					var batchRequests = [];
					_.each(tasks, function (x) {
						batchRequests.push(

							{
							'method': 'PUT',
							'path'  : '/1/classes/Tasks/' + x.objectId,
							'body'	: {
								'hoursLeft'			: x.hoursLeft
								} // end body
							} // end object

						) // end push
					}); // end each loop
					var params = {
						'requests' : batchRequests
					};
					$http.post('https://api.parse.com/1/batch/', params, PARSE_HEADERS);
					$rootScope.$broadcast('taskHours:updated');
				}; // end updateCurrentTask

				return {
					setInitialHours: setInitialHours,
					submitTodaysTimes: submitTodaysTimes
				}

			} // end function
		]); // end factory
}()); // end iif