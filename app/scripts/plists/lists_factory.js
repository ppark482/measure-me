(function(){

	angular.module('FinalProject')
		.factory('ListsFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location', '$cookieStore',
			function ($rootScope, $http, PARSE_HEADERS, $location, $cookieStore) {

				var listURL = 'https://api.parse.com/1/classes/Lists/';

				var addList = function (list) {
					console.log('clicked');
					$http.post(listURL, list, PARSE_HEADERS)
						.then( function () {
							console.log('list added');
						});
				};
				
				return {
					addList: addList,
					createList: createList
				}

			} // end function
		]); // end factory
}()); // end iif