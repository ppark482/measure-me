(function(){

	angular.module('FinalProject')
		.controller('TaskChartControl', ['$scope', '$rootScope', 'ChartFactory', 'TasksFactory', 'DailyInputFactory', '$cookieStore',
			function ($scope, $rootScope, ChartFactory, TasksFactory, DailyInputFactory, $cookieStore) {

				var burnDownData = [];
				$rootScope.$on('setTimes:set', function () {
					// This needs to be changed to pull data from the server 
					// after user sets times. Currently all list charts reflect
					// the data change coming from just one list time set
					var total = TasksFactory.getTotal();
					burnDownData.length = 0;
					var a = (total - (total/4));
					var b = a - (total/4);
					var c = b - (total/4);
					burnDownData.push.apply(burnDownData, [total, a, b, c, 0]);
					// console.log(burnDownData);
				});

				var userInputData = [];
				var updateBurndown = function () {
					var list = $cookieStore.get('currentList');
					var taskTotal = $cookieStore.get('currentListTaskTotal');
					userInputData.length = 0;
					var mon;
					if (list.mon === NaN || list.mon === undefined || list.mon === '') {
						mon = 0;
						} else {
							mon = (taskTotal - list.mon);
						}
					var tue;
					if (list.tue === NaN || list.tue === undefined || list.tue === '') {
						tue = 0;
						} else {
							tue = (mon - list.tue);
						}
					var wed;
					if (list.wed === NaN || list.wed === undefined || list.wed === '') {
						wed = 0;
						} else {
							wed = (tue - list.wed);
						}
					var thur;
					if (list.thur === NaN || list.thur === undefined || list.thur === '') {
						thur = 0;
						} else {
							thur = (wed - list.thur);
						}
					var fri;
					if (list.fri === NaN || list.fri === undefined || list.fri === '') {
						fri = 0;
						} else {
							fri = (thur - list.fri);
						}
					userInputData.push.apply(userInputData, [mon, tue, wed, thur, fri]);
				};

				$rootScope.$on('dailyUpdate:ran', function () {
					var list = $cookieStore.get('currentList');
					DailyInputFactory.getDailyData().success(function () {
						updateBurndown();
					});
					// DailyInputFactory.dailyUpdate(list);
				});

				$rootScope.$on('list:clicked', function () {
					var list = $cookieStore.get('currentList');
					DailyInputFactory.getDailyData().success(function () {
						updateBurndown();
					});
					// DailyInputFactory.dailyUpdate(list);
				});

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

				$scope.dailyUpdate = function (list) {
					DailyInputFactory.dailyUpdate(list);
				}; // end dailyUpdate
			} // end function
		]); // end controller


}()); // end iif