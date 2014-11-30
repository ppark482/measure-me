(function(){

	angular.module('FinalProject')
		.factory('ListsFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location', '$cookieStore', 'ProjectFactory',
			function ($rootScope, $http, PARSE_HEADERS, $location, $cookieStore, ProjectFactory) {

				var listURL = 'https://api.parse.com/1/classes/Lists/';

				var getLists = function () {
					return $http.get(listURL, PARSE_HEADERS);
				};

				var addList = function (list) {
					console.log('clicked');
					var currentProject = ProjectFactory.getSingle();
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
						.then( function () {
							console.log('list added');
							$rootScope.$broadcast('newList:added');
						});
				};

				return {
					getLists: getLists,
					addList: addList
				}

			} // end function
		]); // end factory
}()); // end iif