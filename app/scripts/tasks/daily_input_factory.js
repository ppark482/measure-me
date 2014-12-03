(function(){

	angular.module('FinalProject')
		.factory('DailyInputFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location', '$cookieStore',
			function ($rootScope, $http, PARSE_HEADERS, $location, $cookieStore){

				var listURL = 'https://api.parse.com/1/classes/Lists/';

				var getDailyData = function () {
					$cookieStore.get('currentUser');
					$cookieStore.get('currentList');
					return $http.get(listURL, PARSE_HEADERS);
					$rootScope.$broadcast('dailyUpdate:ran');
				};

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
        	var id = list.objectId;
        	var values = {'mon' : list.mon, 'tue' : list.tue, 'wed' : list.wed, 'thur' : list.thur, 'fri' : list.fri, };
					$http.put(listURL + id, values, PARSE_HEADERS);
					$rootScope.$broadcast('dailyUpdate:ran');
				};			

				return {
					getDailyData: getDailyData,
					dailyUpdate: dailyUpdate
				};

			} // end function
		]); // end factory

}()); // end iif