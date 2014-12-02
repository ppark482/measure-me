(function(){

	angular.module('FinalProject')
		.controller('TaskChartControl', ['$scope', '$rootScope', 'ChartFactory', 'TasksFactory',
			function ($scope, $rootScope, ChartFactory, TasksFactory) {

				var burnDownData = [];
				$rootScope.$on('setTimes:set', function () {
					// This needs to be changed to pull data from the server 
					// after user sets times. Currently all list charts reflect
					// the data change coming from just one list time set
					var total = TasksFactory.getTotal();
					burnDownData.length = 0;
					var a = (total - (total/4));
					var b = a - (total/4);
					var c = b - (total/4)
					burnDownData.push.apply(burnDownData, [total, a, b, c, 0]);
					console.log(burnDownData);
				});

				var userInputData = [];

				$scope.data = {
					labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
					datasets: [
					{
						label: "Burn Down",
	            fillColor: "rgba(220,220,220,0.2)",
	            strokeColor: "#009B57",
	            pointColor: "#D33F2A",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: burnDownData
					},
					{
	            label: "My Inputs",
	            fillColor: "rgba(151,187,205,0.2)",
	            strokeColor: "rgba(151,187,205,1)",
	            pointColor: "rgba(151,187,205,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(151,187,205,1)",
	            data: userInputData
	        }
					] // end datasets
				}; // end scope data

				$scope.options = ChartFactory.getOptions();
			} // end function
		]); // end controller


}()); // end iif