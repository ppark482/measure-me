(function(){

	angular.module('FinalProject')
		.factory('HistoryFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location', '$cookieStore', 
			function ($rootScope, $http, PARSE_HEADERS, $location, $cookieStore) {

				var taskHistoryUrl = 'https://api.parse.com/1/classes/TasksHistory/';

				var getTasks = function () {
					var currentUser = $cookieStore.get('currentUser');
					var currentList = $cookieStore.get('currentList');
					var query = '?'+'where={"listId":"'+currentList.objectId+'"}';
          return $http.get(taskHistoryUrl + query, PARSE_HEADERS);
				};

				return {
					getTasks: getTasks
				}

			} // end function
		]); // end factory

}()); // end iif