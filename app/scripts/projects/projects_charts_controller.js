(function(){

	angular.module('FinalProject')
		.controller('ProjectChartsControl', ['$scope', 'ChartFactory', '$cookieStore', 'ProjectChartsFactory', '$rootScope',
			function ($scope, ChartFactory, $cookieStore, ProjectChartsFactory, $rootScope) {

				ProjectChartsFactory.getProjectTasks().success(function (results) {
					ProjectChartsFactory.manipulateTasks(results);
				});

				$rootScope.$on('taskHours:updated', function () {
					ProjectChartsFactory.getProjectTasks().success(function (results) {
						ProjectChartsFactory.manipulateTasks(results);
					});
				});

				var burnDownData = [];
				var project;
				var currentData;
				var total;
				var hoursSum;
				var projectHoursSum;
				var tempData = [];

				var remapProjectGraph = function () {
					burnDownData = [];
					tempData = [];
					project = $cookieStore.get('currentProject');
					currentData = $cookieStore.get('currentCollection');
					total = project.hours;
					console.log(currentData);
						// Get total hours of task inputs
					_.each(currentData, function (x) {
						tempData.push(x.totalHours);
					});
					hoursSum = tempData.reduce(function (x, y) {
						return x + y;
					}, 0);
					// end total hours of task inputs
					console.log(hoursSum);
					projectHoursSum = hoursSum;

					var DataSet = function (options) {
						this.label = options.label,
						this.fillColor = options.fillColor,
						this.strokeColor = options.strokeColor,
						this.pointColor = options.pointColor,
						this.pointStrokeColor = options.pointStrokeColor,
						this.pointHighlightFill = options.pointHighlightFill,
						this.pointHighlightStroke = options.pointHighlightStroke,
	          this.data = options.data
					}; // end constructor

					// console.log(project);
					// Create burn down line for project
						// Take hoursSum (total task hours), divide by number of days (weeks * 7)
					var totalDays = (project.weeks * 7); // Total Number of days
					// var dailyReq = Math.ceil(hoursSum/totalDays); // Number of hours needed per day
					var dailyReq = hoursSum/totalDays;
					// Math.round( (hoursSum -= dailyReq) * 10) / 10
					burnDownData.push(hoursSum); // Set first value of dataset to total hours
					for (var i = 0; i < totalDays; i++) {
					  burnDownData.push(Math.round( (hoursSum -= dailyReq) * 100) / 100); // push linear values into burndown array
					};
					for (var i = 0; i < burnDownData.length; i++) {
						if (burnDownData[i] <= 0) { // if there is a negative number, set equal to 0
							burnDownData [i] = 0;
						}
					};
					// console.log(burnDownData);
					// burndown line for project
					var projectBurnDown = new DataSet ({
						label : 'Burn Down',
						fillColor : 'RGBA(21, 106, 235, .2)',
	          strokeColor : "#009B57",
	          pointColor : 'RGBA(21, 106, 235, 1)',
	          pointStrokeColor : "#fff",
	          pointHighlightFill : "#71A8A2",
	          pointHighlightStroke : "#71A8A2",
						data : burnDownData
					}); // end of projectBurnDown

					// console.log(currentData);

					var projectLabels = [];
					for (var i = 1; i < (totalDays + 1); i++) {
						projectLabels.push("Day " + i);
					};
					// console.log(projectLabels);

					var dataForEachDate = ProjectChartsFactory.getDataByDate();
					// console.log(dataForEachDate);
					// projectHoursSum // = 100
					var graphData = [];
					_.each(dataForEachDate, function (x) {
						var y = projectHoursSum -= x;
						graphData.push(y);
					});

					$scope.data = {
	    			labels: projectLabels,
		    		datasets: [
		        	projectBurnDown,
		        {
		            label: "My Inputs",
		            fillColor: "RGBA(211, 63, 42, .2)",
		            strokeColor: "rgba(151,187,205,1)",
		            pointColor: "RGBA(211, 63, 42, 1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(151,187,205,1)",
		            data: graphData
		        }
		    		]
					}; // end scope data

				};

				$rootScope.$on('single:project', function () {
					remapProjectGraph();
				}); // end $on

				$rootScope.$on('taskHours:updated', function () {
					remapProjectGraph();
				});

				$scope.options = ChartFactory.getOptions(); // end scope

			} // end function
		]); // end controller
}()); // end iif