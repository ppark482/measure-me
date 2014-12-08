(function(){

	angular.module('FinalProject')
		.factory('ListsFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location', '$cookieStore', 'ProjectFactory',
			function ($rootScope, $http, PARSE_HEADERS, $location, $cookieStore, ProjectFactory) {

				var listURL = 'https://api.parse.com/1/classes/Lists/';
				var projectURL = 'https://api.parse.com/1/classes/Project/';
				var taskURL = 'https://api.parse.com/1/classes/Tasks/';

				var getLists = function () {
					return $http.get(listURL, PARSE_HEADERS);
				}; // end get lists

				var addList = function (list) {
					var currentProject = $cookieStore.get('currentProject');
					list.projectId = currentProject.objectId
					var user = $cookieStore.get('currentUser');
					var userId = {};
					userId[user.objectId] = {
					  'read': true,
					  'write': true
					};
					list.ACL = $.extend(userId, { '*': {'read' : true}}); // end set ACL
					list.userId = user.objectId;

					$http.post(listURL, list, PARSE_HEADERS)
						.success( function () {
							console.log('list added');
							$('.toBeCleared').val('');
							$rootScope.$broadcast('newList:added');
						}); // end post
				}; // end addlist

				var clickList = function (list) {
					$cookieStore.put('currentList', list);
				}; // end clickList

				var deleteList = function (id) {
					var user = $cookieStore.get('currentUser');
					PARSE_HEADERS = {
        		headers : {
          		'X-Parse-Application-Id': 'em1a4NnNesYbYgROEEOsuSpGbGuFkzazhHpyccNH',
			        'X-Parse-REST-API-Key': 'iLZI2A5USKe6XqNUhWNdHXSYJQApRNim3HpmA8YY',
          		'X-Parse-Session-Token' : user.sessionToken,
          		'Content-Type': 'application/json'
        		} // end headers
        	}; // end PARSE_HEADERS
          // console.log(PARSE_HEADERS);
					return $http.delete(listURL + id, PARSE_HEADERS);
				}; // end deleteList

				var getProjectLists = function () {
					var currentProject = $cookieStore.get('currentProject');
					var query = '?'+'where={"projectId":"'+currentProject.objectId+'"}';
          return $http.get(listURL + query, PARSE_HEADERS);
				}; // end getProjectLists

				var getListTasks = function (results) {
					var lists = results.results;
					var currentProject = $cookieStore.get('currentProject');
					var query = '?'+'where={"projectId":"'+currentProject.objectId+'"}';
					return $http.get(taskURL + query, PARSE_HEADERS).success( function (results) {
						var results = results.results;
						calculateListTaskHours(results, lists);
					});
				}; // end getListTasks

				var calculateListTaskHours = function (results, lists) {
					// console.log(results);
					// console.log(lists);
					var ListData = function (options) {
						this.id = options.id,
						this.totalHours = options.totalHours,
						this.hoursLeft = options.hoursLeft
					};
					var collection = [];
					_.each(lists, function (x) {
						var taskCollection = _.where(results, {listId : x.objectId});
						var totalHoursList = [];
						var totalHoursLeftList = [];
						_.each(taskCollection, function (y) {
							totalHoursList.push(y.initialHours);
							totalHoursLeftList.push(y.hoursLeft);
						});
						var totalHoursSum = totalHoursList.reduce(function (x, y) {
							return x + y;
						});
						var totalLeftSum = totalHoursLeftList.reduce(function (x, y) {
							return x + y;
						});
						var listData = new ListData ({
							id : x.objectId,
							totalHours: totalHoursSum,
							hoursLeft: totalLeftSum
						});
						collection.push(listData);
					});
					// collection is an array of instances
					// each instance contains the list id 
					// and the sum of each list's task's initial hours
					$cookieStore.remove('currentCollection');
					$cookieStore.put('currentCollection', collection);
					console.log(collection);
					$rootScope.$broadcast('single:project');
				}; // end calculateListTaskHours

				return {
					getLists: getLists,
					addList: addList,
					clickList: clickList,
					deleteList: deleteList,
					getProjectLists: getProjectLists,
					getListTasks: getListTasks
				}

			} // end function
		]); // end factory
}()); // end iif