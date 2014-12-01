(function(){

	angular.module('FinalProject')
		.factory('TasksFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location', '$cookieStore', 
			function ($rootScope, $http, PARSE_HEADERS, $location, $cookieStore) {

				var taskURL = 'https://api.parse.com/1/classes/Tasks/';

				var getTasks = function () {
					var currentUser = $cookieStore.get('currentUser');
					console.log(currentUser.objectId);
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

				return {
					getTasks: getTasks,
					addTask: addTask
				};

			} // end function
		]); // end factory
}()); // end iif