(function(){

	angular.module('FinalProject')
		.factory('ListsFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location', '$cookieStore', 'ProjectFactory',
			function ($rootScope, $http, PARSE_HEADERS, $location, $cookieStore, ProjectFactory) {

				var listURL = 'https://api.parse.com/1/classes/Lists/';

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
					// $cookieStore.remove('currentList');
					$cookieStore.put('currentList', list);
					console.log($cookieStore.get('currentList', list));
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
          console.log(PARSE_HEADERS);
					return $http.delete(listURL + id, PARSE_HEADERS);
				}; // end deleteList

				return {
					getLists: getLists,
					addList: addList,
					clickList: clickList,
					deleteList: deleteList
				}

			} // end function
		]); // end factory
}()); // end iif