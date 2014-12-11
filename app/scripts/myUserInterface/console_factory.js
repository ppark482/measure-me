(function(){

	angular.module('FinalProject')
		.factory('ConsoleFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location', '$cookieStore', 'HistoryFactory',
			function ($rootScope, $http, PARSE_HEADERS, $location, $cookieStore, HistoryFactory) {

				var projectURL = 'https://api.parse.com/1/classes/Project/';

				var getProjects = function (project) {
					// Need to get from server current user's projects
					return $http.get(projectURL, PARSE_HEADERS);
				}; // end getProject

				var getTasks = function () {
					HistoryFactory.getUserTasks().success( function (results) {
						var grouped = _.groupBy(results.results, 'projectId');
						getGroupedProjects(grouped);	
					}); // end success
				}; // end getTasks

				var ProjectData = function (options) {
						this.data = options.data
					};

				var getGroupedProjects = function (grouped) {
					var paired = _.pairs(grouped);
					_.each(paired, function (y) {
							var data = [];
							var createdData = [];
							var projectData = new ProjectData({
								data : data,
								createdData : createdData
							});
							_.each(y, function (z) {
								console.log(z);
								// data.push(z[1]);
								_.each(z, function (a) {
									// console.log(a);
								}); // end z each
							}); // end y each)
						}); // end paired each
					}; // end grouped

				return {
					getTasks: getTasks,
					getGroupedProjects: getGroupedProjects
				}

			} // end function
		]); // end factory
}()); // end iif