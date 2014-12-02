(function(){

	angular.module('FinalProject')
		.controller('ProjectChartsControl', ['$scope', 'ChartFactory',
			function ($scope, ChartFactory) {

				$scope.data = {
    			labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",],
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

			} // end function
		]); // end controller
}()); // end iif