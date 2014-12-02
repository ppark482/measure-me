(function (){

	angular.module('FinalProject').
		factory('ChartFactory', ['$rootScope', 
			function ($rootScope){

				var data;
				var options = {
					///Boolean - Whether grid lines are shown across the chart
			    scaleShowGridLines : true,
			    //String - Colour of the grid lines
			    scaleGridLineColor : "rgba(0,0,0,.05)",
			    //Number - Width of the grid lines
			    scaleGridLineWidth : 1,
			    //Boolean - Whether the line is curved between points
			    bezierCurve : true,
			    //Number - Tension of the bezier curve between points
			    bezierCurveTension : 0.4,
			    //Boolean - Whether to show a dot for each point
			    pointDot : true,
			    //Number - Radius of each point dot in pixels
			    pointDotRadius : 4,
			    //Number - Pixel width of point dot stroke
			    pointDotStrokeWidth : 1,
			    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
			    pointHitDetectionRadius : 20,
			    //Boolean - Whether to show a stroke for datasets
			    datasetStroke : true,
			    //Number - Pixel width of dataset stroke
			    datasetStrokeWidth : 2,
			    //Boolean - Whether to fill the dataset with a colour
			    datasetFill : true,
			    //String - A legend template
			    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
				};
				var labelsArray = [];

				var getData = function () {
					return data;
				};

				var getOptions = function () {
					return options;
				};

				var getLabelsArray = function () {
					return labelsArray;
				};

				var setData = function (input) {
					data = input;
				};

				var setOptions = function (input) {
					options = input
				};

				var setLabelsArray = function (input) {
					labelsArray = input
				};

				return {
					getData: getData,
					getOptions: getOptions,
					getLabelsArray: getLabelsArray,
					setData: setData,
					setOptions: setOptions,
					setLabelsArray: setLabelsArray
				};

			} // end function
		]); // end factory

}()); // end iif