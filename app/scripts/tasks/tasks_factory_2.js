(function(){

	angular.module('FinalProject')
		.factory('ExtendedTasksFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location', '$cookieStore', 'TasksFactory',
			function ($rootScope, $http, PARSE_HEADERS, $location, $cookieStore, TasksFactory){

				var taskURL = 'https://api.parse.com/1/classes/Tasks/';
				var historyURL = 'https://api.parse.com/1/classes/TasksHistory/';

				var setInitialHours = function (tasks) {
					console.log(tasks);
					var batchRequests = [];
					_.each(tasks, function (x) {
						var initialHours = x.initialHours === '' ? x.initialHours = 0 : parseInt(x.initialHours);
						var hoursLeft = x.hoursLeft === '' ? x.hoursLeft = 0 : parseInt(x.hoursLeft);
						if (hoursLeft <= 0) {
							hoursLeft = hoursLeft + initialHours;
						} else if (!hoursLeft) {
							hoursLeft = initialHours;
						} else {hoursLeft = hoursLeft + initialHours};
						batchRequests.push(

							{
							'method': 'PUT',
							'path'  : '/1/classes/Tasks/' + x.objectId,
							'body'	: {
								'initialHours': initialHours,
								'hoursLeft'		: hoursLeft
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
        	$http.post('https://api.parse.com/1/batch/', params, PARSE_HEADERS).success( function(data) {
        		$rootScope.$broadcast('listTimes:updated');	
        	});
				}; // end set initial hours

				var submitTodaysTimes = function (tasks) {
					// Post to Tasks History to track
					var user = $cookieStore.get('currentUser');
					var project = $cookieStore.get('currentProject');
					var list = $cookieStore.get('currentList');
					var batchRequests = [];
					_.each(tasks, function (x) {
						var initialHours = parseInt(x.initialHours);
						var hoursLeft = x.hoursLeft ? parseInt(x.hoursLeft): x.hoursLeft;
						var hoursToday = x.hoursToday ? parseInt(x.hoursToday) : x.hoursToday = 0;
						if (hoursLeft <= 0) {
							hoursLeft = 0;
							} else if (!hoursLeft) {
							hoursLeft = initialHours;
							} else {hoursLeft = hoursLeft - hoursToday};
						batchRequests.push(

							{
							'method': 'POST',
							'path'  : '/1/classes/TasksHistory',
							'body'	: {
								'userId' 				: user.objectId,
								'projectId' 		: project.objectId,
								'listId' 				: list.objectId,
								'initialHours'	: initialHours,
								'hoursToday'		: hoursToday,
								'hoursLeft'			: hoursLeft,
								'title'					: x.title,
								'taskId'				: x.objectId
								} // end body
							} // end object

						) // end push
					}); // end each
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
        	$('.toBeCleared').val('');
        	$http.post('https://api.parse.com/1/batch/', params, PARSE_HEADERS).success( function (data) {
        		updateCurrentTask(tasks, user, project, list, PARSE_HEADERS);	
        	});
				}; // end submitTodaysTimes

				var updateCurrentTask = function (tasks, user, project, list, PARSE_HEADERS) {
					var batchRequests = [];
					_.each(tasks, function (x) {
						var initialHours = parseInt(x.initialHours);
						var hoursLeft = x.hoursLeft ? parseInt(x.hoursLeft): x.hoursLeft;
						var hoursToday = x.hoursToday ? parseInt(x.hoursToday) : x.hoursToday = 0;
						if (hoursLeft <= 0) {
							hoursLeft = 0;
						} else if (!hoursLeft) {
							hoursLeft = initialHours;
						} else {hoursLeft = hoursLeft - hoursToday};
						batchRequests.push(
							{
							'method': 'PUT',
							'path'  : '/1/classes/Tasks/' + x.objectId,
							'body'	: {
								'initialHours'	: initialHours,
								'hoursToday'		: hoursToday,
								'hoursLeft'			: hoursLeft
								} // end body
							} // end object
						) // end push
					}); // end each loop
					var params = {
						'requests' : batchRequests
					};
					$('.toBeCleared').val('');
					$http.post('https://api.parse.com/1/batch/', params, PARSE_HEADERS).success( function (data) {
						$rootScope.$broadcast('taskHours:updated');
					});
				}; // end updateCurrentTask

				return {
					setInitialHours: setInitialHours,
					submitTodaysTimes: submitTodaysTimes
				}

			} // end function
		]); // end factory
}()); // end iif