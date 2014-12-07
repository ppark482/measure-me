(function(){

	angular.module('FinalProject')
		.controller('TaskChartControl', ['$scope', '$rootScope', 'ChartFactory', 'ExtendedTasksFactory', '$cookieStore', 'HistoryFactory',
			function ($scope, $rootScope, ChartFactory, ExtendedTasksFactory, $cookieStore, HistoryFactory) {

				var graphLabels = [];

				$rootScope.$on('taskHours:updated', function () {
					displayGraph();
				});

				$rootScope.$on('list:clicked', function () {
					displayGraph();
				}); // end rootScope call

				var displayGraph = function () {
					var dataLabels = [];
					var dataSets = [];
					graphLabels = [];
					// create a constructor for each individual task
					var TaskDataSet = function (options) {
						this.label = "Task",
						this.fillColor = "rgba(220,220,220,0.2)",
						this.strokeColor = "#009B57",
						this.pointColor = "rgba(220,220,220,1)",
						this.pointStrokeColor = "#fff",
						this.pointHighlightFill = "#fff",
						this.pointHighlightStroke = "rgba(220,220,220,1)",
						this.data = options.data
					};

					HistoryFactory.getTasks().success( function (results) {
						var tempLabels = [];
						var results = results.results;
						// console.log(results);
						var taskIds = _.pluck(results, 'taskId');
						var unique = _.uniq(taskIds);
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
									if (a.createdAt) {
										tempLabels.push(a.createdAt);
									}
								});
							}); // end y each
							// console.log(data);
						}); // end x each
						// console.log(dataSets);
						var convertTime = [];
						_.each(tempLabels, function (x) {
							 var date = new Date(x).toLocaleString();
							 convertTime.push(date);
						});
						var uniqueLabels = _.uniq(convertTime);
						graphLabels = [];
						_.each(uniqueLabels, function (x) {
							var y = x.toString();
							graphLabels.push(y);
						});
						// console.log(graphLabels);
						$scope.data = {
		    			labels: graphLabels,
			    		datasets: dataSets
						}; // end scope data
					}); // end get tasks


					$scope.options = ChartFactory.getOptions(); // end scope

				}; // end displayGraph

			} // end function
		]); // end controller

}()); // end iif