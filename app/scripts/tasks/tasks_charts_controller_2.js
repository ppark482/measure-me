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
						this.fillColor = "rgba(220,220,220,0.2)",
						this.strokeColor = "#009B57",
						this.pointColor = "rgba(220,220,220,1)",
						this.pointStrokeColor = "#fff",
						this.pointHighlightFill = "#fff",
						this.pointHighlightStroke = "rgba(220,220,220,1)",
						this.data = options.data
					};

					HistoryFactory.getTasks().success( function (results) {
						var results = results.results;
						// console.log(results);
						var taskIds = _.pluck(results, 'taskId');
						var unique = _.uniq(taskIds);
						var length = unique.length;

						var sameTasks = _.groupBy(results, 'taskId');
						var pairsTasks = _.pairs(sameTasks);
						// console.log(pairsTasks);
						_.each(pairsTasks, function (y) {
							var data = [];
							var taskDataSet = new TaskDataSet({data: data});
							dataSets.push(taskDataSet);
							_.each(y, function (z) {
								// console.log(z);
								// data.push(z[1]);
								_.each(z, function (a) {
									if (a.hoursLeft) {
										data.push(a.hoursLeft);
									}
									// console.log(a);
								});
							}); // end y each
							// console.log(data);
							console.log(dataSets);
						}); // end x each

					}); // end get tasks

										$scope.data = {
	    			labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
		    		datasets: dataSets
					}; // end scope data

					// $scope.data = {
	    // 			labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
		   //  		datasets: [
		   //      {
		   //          label: "Burn Down",
		   //          fillColor: "rgba(220,220,220,0.2)",
		   //          strokeColor: "#009B57",
		   //          pointColor: "rgba(220,220,220,1)",
		   //          pointStrokeColor: "#fff",
		   //          pointHighlightFill: "#fff",
		   //          pointHighlightStroke: "rgba(220,220,220,1)",
		   //          data: [70, 63, 56, 49, 42, 35, 28, 21, 14, 7]
		   //      },
		   //      {
		   //          label: "My Inputs",
		   //          fillColor: "rgba(151,187,205,0.2)",
		   //          strokeColor: "rgba(151,187,205,1)",
		   //          pointColor: "rgba(151,187,205,1)",
		   //          pointStrokeColor: "#fff",
		   //          pointHighlightFill: "#fff",
		   //          pointHighlightStroke: "rgba(151,187,205,1)",
		   //          data: [60, 55, 55, 55, 40]
		   //      }
		   //  		]
					// }; // end scope data

					$scope.options = ChartFactory.getOptions(); // end scope
				
				}); // end rootScope call

			} // end function
		]); // end controller

}()); // end iif