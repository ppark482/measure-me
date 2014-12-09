(function(){

	angular.module('FinalProject')
		.factory('ProjectChartsFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location', '$cookieStore',
			function ($rootScope, $http, PARSE_HEADERS, $location, $cookieStore) {

				var taskHistoryUrl = 'https://api.parse.com/1/classes/TasksHistory/';

				var getProjectTasks = function () {
					var currentProject = $cookieStore.get('currentProject');
					var query = '?'+'where={"projectId":"'+currentProject.objectId+'"}';
          return $http.get(taskHistoryUrl + query, PARSE_HEADERS);
				};

				var dataByDate = [];

				var manipulateTasks = function (results) {
					var date = moment().format('MM-DD-YY');
					// console.log(date);
					var results = results.results;
					var datesArray = [];
					_.each(results, function (x) {
						var y = moment(x.createdAt).format('MMDDYY');
						x.createdDate = y;
						datesArray.push(y);
					});
					var uniqueDates = _.uniq(datesArray);
					// console.log(results);
					// console.log(uniqueDates);
					// var startDate = uniqueDates[0];
					var groupedByDate = [];
					_.each(uniqueDates, function (x) {
						var z = _.where(results, {createdDate : x});
						groupedByDate.push(z);
					});
					// console.log(groupedByDate);
					var sumOfDate;
					dataByDate = [];
					_.each(groupedByDate, function (x) {
						var taskValues = [];
						_.each(x, function (y) {
							taskValues.push(y.hoursToday);
						});
						sumOfDate = _.reduce(taskValues, function (x, y) {
							return x + y;
						}); // end reduce;
						dataByDate.push(sumOfDate);
					});
				}; // end manipulateTasks

				var getDataByDate = function () {
					return dataByDate;
				};

				return {
					getProjectTasks: getProjectTasks,
					manipulateTasks: manipulateTasks,
					getDataByDate: getDataByDate
				}

			} // end function
		]); // end factory 
}()); // end iif