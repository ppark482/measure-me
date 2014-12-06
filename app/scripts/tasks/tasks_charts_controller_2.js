(function(){

	angular.module('FinalProject')
		.controller('TaskChartControl', ['$scope', '$rootScope', 'ChartFactory', 'ExtendedTasksFactory', '$cookieStore', 'HistoryFactory',
			function ($scope, $rootScope, ChartFactory, ExtendedTasksFactory, $cookieStore, HistoryFactory) {

				$rootScope.$on('list:clicked', function () {

					var dataLabels = [];
					var dataSets = [];
					// create a constructor for each individual task
					var TaskDataSet = function (options) {
						this.label = options.label,
						this.fillColor = options.fillColor,
						this.strokeColor = options.strokeColor,
						this.pointColor = options.pointColor,
						this.pointStrokeColor = options.pointStrokeColor,
						this.pointHighlightFill = options.pointHighlightFill,
						this.pointHighlightStroke = options.pointHighlightStroke,
						this.data = options.data
					};

					HistoryFactory.getTasks().success( function (results) {
						var results = results.results;
						var titles = _.pluck(results, 'title');
						var unique = _.uniq(titles);
						console.log(unique);
						var sameTasks = [];
						_.each(unique, function (x) {
							sameTasks.push(_.where(results, {title: x}));
						});
						// sameTasks is now an array with x number of arrays
						// based on the number of unique names
						var length = unique.length;
						_.each(sameTasks, function (x) {
							var taskDataSet = new TaskDataSet({
								label: x
							});
							dataSets.push(taskDataSet);
						});
						console.log(dataSets);
					});

					$scope.data = {
	    			labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
		    		datasets: [
		        {
		            label: "Burn Down",
		            fillColor: "rgba(220,220,220,0.2)",
		            strokeColor: "#009B57",
		            pointColor: "rgba(220,220,220,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [70, 63, 56, 49, 42, 35, 28, 21, 14, 7]
		        },
		        {
		            label: "My Inputs",
		            fillColor: "rgba(151,187,205,0.2)",
		            strokeColor: "rgba(151,187,205,1)",
		            pointColor: "rgba(151,187,205,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(151,187,205,1)",
		            data: [60, 55, 55, 55, 40]
		        }
		    		]
					}; // end scope data

					$scope.options = ChartFactory.getOptions(); // end scope
				
				}); // end rootScope call

			} // end function
		]); // end controller

}()); // end iif