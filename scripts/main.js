(function(){

	angular.module('FinalProject', ['ngRoute', 'mm.foundation', 'ngCookies', 'angular-momentjs', 'tc.chartjs']) // setter

		.constant('PARSE_HEADERS', {
      headers: {
        'X-Parse-Application-Id': 'em1a4NnNesYbYgROEEOsuSpGbGuFkzazhHpyccNH',
        'X-Parse-REST-API-Key': 'iLZI2A5USKe6XqNUhWNdHXSYJQApRNim3HpmA8YY',
        'Content-Type': 'application/json'
      }
    }) // end constant
		.config( function($routeProvider) {
			$routeProvider.when('/', {
				templateUrl: 'templates/home.html',
				controller: 'AccountControl'
			}); // end route
			$routeProvider.when('/register', {
				templateUrl: 'scripts/accounts/register_template.html',
				controller: 'AccountControl'
			}); // end route
			$routeProvider.when('/login', {
				templateUrl: 'scripts/accounts/login_template.html',
				controller: 'AccountControl'
			}); // end route
			$routeProvider.when('/myconsole', {
				templateUrl: 'scripts/myUserInterface/my_console.html',
				controller: 'MyAccountControl'
			}); // end route
			$routeProvider.when('/project/:id', {
				templateUrl: 'scripts/projects/single_project_template.html',
				controller: 'SingleProjectControl',
			}); // end route

		}) // end config

		.directive('stopEvent', function () {
	    return {
	        restrict: 'A',
	        link: function (scope, element, attr) {
	            element.bind('click', function (e) {
	                e.stopPropagation();
	            });
	        } // end link
	    }; // end return
 		}); // end directive

}()); // end iif
(function(){

	angular.module('FinalProject')
		.factory('AccountFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location', '$cookieStore',
			function($rootScope, $http, PARSE_HEADERS, $location, $cookieStore){

				var userInfo;
				var usersUrl = 'https://api.parse.com/1/users/';
				var loginUrl = 'https://api.parse.com/1/login/';

				var register = function (user) {
					$http.post(usersUrl, user, PARSE_HEADERS)
						.success( function () {
							login(user);
						} // end success
					); // end post
				}; // end register

				var login = function (user) {
					var params = 'username='+user.username+'&password='+user.password;
          $http.get('https://api.parse.com/1/login/?'+params, PARSE_HEADERS)
            .success( function (data) {
            	$cookieStore.put('currentUser', data);
            	// 'X-Parse-Session-Token' : 'jyLSaxAugbDna3uNNOT4wPDae',
            	// console.log(data.sessionToken);
            	// console.log(PARSE_HEADERS);
            	return checkUser();
          }); // end success
				}; // end login

				var logout = function () {
					$cookieStore.remove('currentUser');
					return checkUser();
				}; // end logout

				var checkUser = function () {
					var user = $cookieStore.get('currentUser');
					// console.log(user);
					if (user !== undefined) {
						console.log('User is ' + user.username);
						$location.path('/myconsole');
					} else {
						console.log('No Current User logged in');
						$location.path('/login');
					}
				}; // end checkUser

				return {
					register: register,
					login: login,
					logout: logout,
					checkUser: checkUser
				}

			}]); // end of factory

}()); // end iif
(function (){

	angular.module('FinalProject')
		.controller('AccountControl', ['$scope', 'AccountFactory', '$rootScope',
			function($scope, AccountFactory, $rootScope){

				$scope.register = function (user) {
					AccountFactory.register(user);
				};

				$scope.login = function (user) {
					AccountFactory.login(user);
				};
			} // end function
		]); // end controller
}()); // end iif
(function(){

	angular.module('FinalProject')
		.controller('MyAccountControl', ['$scope', 'AccountFactory', '$cookieStore', '$filter',
			function($scope, AccountFactory, $cookieStore, $filter) {

				$scope.user = $cookieStore.get('currentUser');

				$scope.logout = function () {
					AccountFactory.logout();
				}; // end logout

				$scope.date = $filter('date')( Date.now(), 'medium');

			} // end function
		]); // end controller
}()); // end iif
(function(){

	angular.module('FinalProject')

		.controller('MainModalControl', ['$scope', '$modal', '$log', 'ProjectFactory',
			 function ($scope, $modal, $log, ProjectFactory) {

			  $scope.open = function () {

			    var modalInstance = $modal.open({
			      templateUrl: 'scripts/myUserInterface/add_modal_template.html',
			      controller: 'ModalInstanceControl',
			      backdrop: true,
			      resolve: {
			        items: function () {
			          return $scope.items;
			        }
			      }
			    }); // end modalInstance

			    modalInstance.result.then(function (selectedItem) {
			      $scope.selected = selectedItem;
			    }, function () {
			      $log.info('Modal closed');
			    }); // end modalInstance.result

				}; // end open

			} // end function
		]) // end controller

	// $modalInstance represents a modal window (instance) dependency.
	// not the same as the $modal service used above.

	.controller('ModalInstanceControl', ['$scope', '$modalInstance', 'ProjectFactory', '$rootScope',
		function ($scope, $modalInstance, ProjectFactory, $rootScope) {

			$scope.addProject = function (project) {
				// to ProjectFactory
				ProjectFactory.addProject(project);
				$modalInstance.close();
				$rootScope.$broadcast('project:added', function () {
					
				});
			}; // end addProject

		  $scope.ok = function () {
		    $modalInstance.close();
		  }; // end ok

		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  }; // end cancel

		} // end function
	]); // end controller

}()); // end of iif
(function(){

	angular.module('FinalProject')
		.controller('ProjectsControl', ['$scope', '$rootScope', '$cookieStore', 'ProjectFactory', '$location',
			function($scope, $rootScope, $cookieStore, ProjectFactory, $location){

				$rootScope.$on('project:added', function () {
					ProjectFactory.getProjects()
					.success(function(results) {
						var user = $cookieStore.get('currentUser');
						var results = results.results;
						$scope.projects = _.where(results, {
							userId: user.objectId
						});
					}); // end success
				}); // end on

				ProjectFactory.getProjects()
					// after getting all projects from server
					// look through all projects for user specific projects
					// allow controller to pass data to template
					.success(function(results) {
						var user = $cookieStore.get('currentUser');
						var results = results.results;
						$scope.projects = _.where(results, {
							userId: user.objectId
						});
					}); // end success

				$scope.clickProject = function (project) {
					$cookieStore.put('currentProject', project);
					$location.path('/project/' + project.objectId);
				}; // end clickProject

			} // end function
		]); // end controller
}()); // end iff
(function(){

	angular.module('FinalProject')
		.factory('ProjectFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location', '$cookieStore',
			function($rootScope, $http, PARSE_HEADERS, $location, $cookieStore) {

				var projectURL = 'https://api.parse.com/1/classes/Project/';

				var getProjects = function (project) {
					// Need to get from server current user's projects
					return $http.get(projectURL, PARSE_HEADERS);
				}; // end getProject

				var addProject = function (project) {
					// from MainModalControl
					var user = $cookieStore.get('currentUser');
					var userId = {};
					userId[user.objectId] = {
					  'read': true,
					  'write': true
					};
					project.ACL = $.extend(userId, { '*': {'read' : true}}); // end set ACL
					project.userId = user.objectId;
					$http.post(projectURL, project, PARSE_HEADERS)
						.then(function (){
							console.log('Project Added');
							$rootScope.$broadcast('project:added');
							$location.path('/myconsole');
						}); // end success
				}; // end addProject

				var consoleReturn = function () {
					$location.path('/myconsole');
				}; // end consoleReturn

				return {
					getProjects: getProjects,
					addProject: addProject,
					consoleReturn: consoleReturn
				} // end returns

			} // end function
		]); // end factory

}()); // end iif
(function(){

	angular.module('FinalProject')
		.controller('SingleProjectControl', ['$scope', '$cookieStore', 'ProjectFactory', '$location', '$routeParams', 
				'$http', 'ListsFactory',
			function($scope, $cookieStore, ProjectFactory, $location, $routeParams, $http, ListsFactory) {

				$scope.project = $cookieStore.get('currentProject');

				$scope.user = $cookieStore.get('currentUser');

				$scope.consoleReturn = function () {
					$cookieStore.remove('currentProject');
					$cookieStore.remove('currentList');
					ProjectFactory.consoleReturn();
				};

			} // end function

		]); // end controller

}()); // end iif
(function(){

	angular.module('FinalProject')
		.controller('ProjectChartsControl', ['$scope', 'ChartFactory', '$cookieStore',
			function ($scope, ChartFactory, $cookieStore) {

				var burnDownData = [];
				var project = $cookieStore.get('currentProject');
				var total = project.hours;
				burnDownData.length = 0;
				

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
(function(){

	angular.module('FinalProject')
		.controller('ListsControl', ['$scope', '$cookieStore', 'ListsFactory', 'TasksFactory', '$rootScope',
			'ProjectFactory', '$location', '$routeParams', '$http', 
			function($scope, $cookieStore, ListsFactory, TasksFactory, $rootScope, ProjectFactory, $location, $routeParams, $http) {

				$rootScope.$on('newList:added', function (event, args) {
					ListsFactory.getLists().success(function(results) {
						var currentProject = $cookieStore.get('currentProject');
						var results = results.results;
						$scope.lists = _.where(results, {
							projectId: currentProject.objectId
						});
					}); // end success
				});

				ListsFactory.getLists()
					// after getting all projects from server
					// look through all projects for user specific projects
					// allow controller to pass data to template
					.success(function(results) {
						var currentProject = $cookieStore.get('currentProject');
						var results = results.results;
						$scope.lists = _.where(results, {
							projectId: currentProject.objectId
						});
					}); // end success

				$scope.addList = function (list) {
					ListsFactory.addList(list);
				}; // end createlist

				$scope.clickList = function (list) {
					ListsFactory.clickList(list);
					$rootScope.$broadcast('list:clicked');
				}; // end clickList

				$scope.deleteList = function (id, index) {
					ListsFactory.deleteList(id).success( function () {
						$scope.lists.splice(index, 1);
					});
				}; // end deleteList

			} // end function
		]); // end controller
}()); // end iif
(function(){

	angular.module('FinalProject')
		.factory('ListsFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location', '$cookieStore', 'ProjectFactory',
			function ($rootScope, $http, PARSE_HEADERS, $location, $cookieStore, ProjectFactory) {

				var listURL = 'https://api.parse.com/1/classes/Lists/';

				var getLists = function () {
					return $http.get(listURL, PARSE_HEADERS);
				}; // end get lists

				var addList = function (list) {
					var currentProject = $cookieStore.get('currentProject');
					list.projectId = currentProject.objectId
					var user = $cookieStore.get('currentUser');
					var userId = {};
					userId[user.objectId] = {
					  'read': true,
					  'write': true
					};
					list.ACL = $.extend(userId, { '*': {'read' : true}}); // end set ACL
					list.userId = user.objectId;

					$http.post(listURL, list, PARSE_HEADERS)
						.success( function () {
							console.log('list added');
							$('.toBeCleared').val('');
							$rootScope.$broadcast('newList:added');
						}); // end post
				}; // end addlist

				var clickList = function (list) {
					// $cookieStore.remove('currentList');
					$cookieStore.put('currentList', list);
				}; // end clickList

				var deleteList = function (id) {
					var user = $cookieStore.get('currentUser');
					PARSE_HEADERS = {
        		headers : {
          		'X-Parse-Application-Id': 'em1a4NnNesYbYgROEEOsuSpGbGuFkzazhHpyccNH',
			        'X-Parse-REST-API-Key': 'iLZI2A5USKe6XqNUhWNdHXSYJQApRNim3HpmA8YY',
          		'X-Parse-Session-Token' : user.sessionToken,
          		'Content-Type': 'application/json'
        		} // end headers
        	}; // end PARSE_HEADERS
          console.log(PARSE_HEADERS);
					return $http.delete(listURL + id, PARSE_HEADERS);
				}; // end deleteList

				return {
					getLists: getLists,
					addList: addList,
					clickList: clickList,
					deleteList: deleteList
				}

			} // end function
		]); // end factory
}()); // end iif
(function(){

	angular.module('FinalProject')
		.controller('TasksControl', ['$scope', '$rootScope', 'TasksFactory', 'ExtendedTasksFactory', '$http', 'PARSE_HEADERS', '$location', '$cookieStore',
			function ($scope, $rootScope, TasksFactory, ExtendedTasksFactory, $http, PARSE_HEADERS, $location, $cookieStore) {

				var broadcastCalls = function () {
					TasksFactory.getTasks().success( function (data) {
						var results = data.results;
						_.each(results, function (x) {
							x.hoursToday = ''
						});
						$scope.tasks = results;
					});
				};

				$rootScope.$on('list:clicked', function () {
					broadcastCalls();
				});

				$rootScope.$on('newTask:added', function () {
					broadcastCalls();
				});

				$rootScope.$on('listTimes:updated', function () {
					broadcastCalls();
				});

				$rootScope.$on('task:deleted', function () {
					broadcastCalls();
				});

				$rootScope.$on('taskHours:updated', function () {
					broadcastCalls();
				});

				$scope.addTask = function (task) {
					TasksFactory.addTask(task);
				};

				$scope.deleteTask = function (task) {
					TasksFactory.deleteTask(task);
				};

				$scope.taskSum = function (task) {
					TasksFactory.taskSum(task);
				};

				$scope.updateTaskTimes = function (tasks) {
					TasksFactory.updateListTimes(tasks);
				};

				$scope.dailyUpdate = function (list) {
					TasksFactory.dailyUpdate(list);
				};

				$scope.goToEdit = function () {
					$('.toBeCleared').val('');
					$scope.timeSet = true;	
				};

				$scope.setInitialHours = function (tasks) {
					$scope.timeSet = false;
					$('.toBeCleared').trigger('input');
					ExtendedTasksFactory.setInitialHours(tasks);
				};

				$scope.putHoursLeft = function (task) {
					if (task.hoursLeft > 0) {
						return true;
					} else if (task.hoursLeft <= 0) {
						return false;
					} else if (!task.hoursLeft) {
						return false;
					} else {return true;}
				};
				$scope.putInitialHours = function (task) {
					if (task.hoursLeft > 0) {
						return false;
					} else if (task.hoursLeft <= 0) {
						return false;
					}	else if (!task.hoursLeft) {
						return true;
					} else {return false;}
				};

				$scope.hoursLeftComplete = function (task) {
					if (task.hoursLeft <= 0)
						return true;
				};

				$scope.submitTodaysTimes = function (tasks) {
					$('.hoursCompletedToday').trigger('input');
					$('.hoursCompletedToday').val('');
					ExtendedTasksFactory.submitTodaysTimes(tasks);
				};

			} // end function
		]); // end controller

}()); // end iif
(function(){

	angular.module('FinalProject')
		.factory('TasksFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location', '$cookieStore', 
			function ($rootScope, $http, PARSE_HEADERS, $location, $cookieStore) {

				var taskURL = 'https://api.parse.com/1/classes/Tasks/';

				var getTasks = function () {
					var currentUser = $cookieStore.get('currentUser');
					var currentList = $cookieStore.get('currentList');
					var query = '?'+'where={"listId":"'+currentList.objectId+'"}';
          return $http.get(taskURL + query, PARSE_HEADERS);
				};

				var addTask = function (task) {
					var currentList = $cookieStore.get('currentList');
					var currentProject = $cookieStore.get('currentProject');
					var user = $cookieStore.get('currentUser');
					var userId = {};
					userId[user.objectId] = {
					  'read': true,
					  'write': true
					};
					task.ACL = $.extend(userId, { '*': {'read' : true}}); // end set ACL
					task.userId = user.objectId;
					task.projectId = currentProject.objectId;
					task.listId = currentList.objectId;
					$http.post(taskURL, task, PARSE_HEADERS)
						.success( function () {
							$('.toBeCleared').val('');
							$rootScope.$broadcast('newTask:added');
						});

				}; // end addTask

				var deleteTask = function (task) {
					var user = $cookieStore.get('currentUser');
					PARSE_HEADERS = {
        		headers : {
          		'X-Parse-Application-Id': 'em1a4NnNesYbYgROEEOsuSpGbGuFkzazhHpyccNH',
			        'X-Parse-REST-API-Key': 'iLZI2A5USKe6XqNUhWNdHXSYJQApRNim3HpmA8YY',
          		'X-Parse-Session-Token' : user.sessionToken,
          		'Content-Type': 'application/json'
        		} // end headers
        	}; // end PARSE_HEADERS
        	var id = task.objectId;
        	console.log(id);
        	return $http.delete(taskURL + id, PARSE_HEADERS)
        		.success( function () {
        			$rootScope.$broadcast('task:deleted');
        		});
				};

				var taskSum = function (task) {
					// dynamically sum up user inputs
					// for individual tasks to display
					// next to list titles
					var total = 0;
					angular.forEach(task, function (item) {
						total += parseInt(item.value);
					});
					return total;
					console.log(total);
				}; // end task Sum

				var listId;
				var setListId = function (id) {
					listId = id;
				};
				var total;
				var setTimes = function (task) {
					// populates existing task times
					var currentList = $cookieStore.get('currentList');
					total = 0;
					angular.forEach(task, function (item) {
						if (item.value === undefined) {
							item.value = 0;
						}
						total += parseInt(item.value);
					});
					$cookieStore.put('currentListTaskTotal', total);
					$rootScope.$broadcast('setTimes:set');
					return total;
				}; // end task Sum

				var getTotal = function () {
					return total;
				}; // end getTotal

				var updateListTimes = function (tasks) { // after setting task times, update to server
					var batchRequests = [];
					console.log(tasks);
					_.each(tasks, function (x) {
						batchRequests.push(

							{
							'method': 'PUT',
							'path'  : '/1/classes/Tasks/' + x.objectId,
							'body'	: {
								'value': x.value
							} // end body
						} // end object

							) // end push
					});
					var user = $cookieStore.get('currentUser');
					PARSE_HEADERS = {
        		headers : {
          		'X-Parse-Application-Id': 'em1a4NnNesYbYgROEEOsuSpGbGuFkzazhHpyccNH',
			        'X-Parse-REST-API-Key': 'iLZI2A5USKe6XqNUhWNdHXSYJQApRNim3HpmA8YY',
          		'X-Parse-Session-Token' : user.sessionToken,
          		'Content-Type': 'application/json'
        		} // end headers
        	}; // end PARSE_HEADERS
        	var params = {
        		'requests' : batchRequests
        	};
        	$http.post('https://api.parse.com/1/batch/', params, PARSE_HEADERS);
        	$rootScope.$broadcast('listTimes:updated');
				}; // end update list times

				return {
					getTasks: getTasks,
					addTask: addTask,
					deleteTask: deleteTask,
					taskSum: taskSum,
					setListId: setListId,
					setTimes: setTimes,
					getTotal: getTotal,
					updateListTimes: updateListTimes
				};

			} // end function
		]); // end factory
}()); // end iif
(function(){

	angular.module('FinalProject')
		.factory('ExtendedTasksFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location', '$cookieStore', 'TasksFactory',
			function ($rootScope, $http, PARSE_HEADERS, $location, $cookieStore, TasksFactory){

				var taskURL = 'https://api.parse.com/1/classes/Tasks/';
				var historyURL = 'https://api.parse.com/1/classes/TasksHistory/';

				var setInitialHours = function (tasks) {
					var batchRequests = [];
					_.each(tasks, function (x) {
						var initialHours = x.initialHours === '' ? x.initialHours = 0 : parseInt(x.initialHours);
						var hoursLeft = x.hoursLeft === '' ? x.hoursLeft = 0 : parseInt(x.hoursLeft);
						if (hoursLeft <= 0) {
							hoursLeft = hoursLeft + initialHours;
						} else if (!hoursLeft) {
							hoursLeft = initialHours;
						} else {hoursLeft = hoursLeft + initialHours};
						console.log(x);
						batchRequests.push(

							{
							'method': 'PUT',
							'path'  : '/1/classes/Tasks/' + x.objectId,
							'body'	: {
								'initialHours': initialHours,
								'hoursLeft'		: hoursLeft
							} // end body
						} // end object

							) // end push
					});
					var user = $cookieStore.get('currentUser');
					PARSE_HEADERS = {
        		headers : {
          		'X-Parse-Application-Id': 'em1a4NnNesYbYgROEEOsuSpGbGuFkzazhHpyccNH',
			        'X-Parse-REST-API-Key': 'iLZI2A5USKe6XqNUhWNdHXSYJQApRNim3HpmA8YY',
          		'X-Parse-Session-Token' : user.sessionToken,
          		'Content-Type': 'application/json'
        		} // end headers
        	}; // end PARSE_HEADERS
        	var params = {
        		'requests' : batchRequests
        	};
        	$http.post('https://api.parse.com/1/batch/', params, PARSE_HEADERS).success( function(data) {
        		$rootScope.$broadcast('listTimes:updated');	
        	});
				}; // end set initial hours

				var submitTodaysTimes = function (tasks) {
					// Post to Tasks History to track
					var user = $cookieStore.get('currentUser');
					var project = $cookieStore.get('currentProject');
					var list = $cookieStore.get('currentList');
					var batchRequests = [];
					_.each(tasks, function (x) {
						var initialHours = parseInt(x.initialHours);
						var hoursLeft = x.hoursLeft ? parseInt(x.hoursLeft): x.hoursLeft;
						var hoursToday = x.hoursToday ? parseInt(x.hoursToday) : x.hoursToday = 0;
						if (hoursLeft <= 0) {
							hoursLeft = 0;
							} else if (!hoursLeft) {
							hoursLeft = initialHours;
							} else {hoursLeft = hoursLeft - hoursToday};
						batchRequests.push(

							{
							'method': 'POST',
							'path'  : '/1/classes/TasksHistory',
							'body'	: {
								'userId' 				: user.objectId,
								'projectId' 		: project.objectId,
								'listId' 				: list.objectId,
								'initialHours'	: initialHours,
								'hoursToday'		: hoursToday,
								'hoursLeft'			: hoursLeft,
								'title'					: x.title
								} // end body
							} // end object

						) // end push
					}); // end each
					PARSE_HEADERS = {
        		headers : {
          		'X-Parse-Application-Id': 'em1a4NnNesYbYgROEEOsuSpGbGuFkzazhHpyccNH',
			        'X-Parse-REST-API-Key': 'iLZI2A5USKe6XqNUhWNdHXSYJQApRNim3HpmA8YY',
          		'X-Parse-Session-Token' : user.sessionToken,
          		'Content-Type': 'application/json'
        		} // end headers
        	}; // end PARSE_HEADERS
        	var params = {
        		'requests' : batchRequests
        	};
        	$('.toBeCleared').val('');
        	$http.post('https://api.parse.com/1/batch/', params, PARSE_HEADERS).success( function (data) {
        		updateCurrentTask(tasks, user, project, list, PARSE_HEADERS);	
        	});
				}; // end submitTodaysTimes

				var updateCurrentTask = function (tasks, user, project, list, PARSE_HEADERS) {
					var batchRequests = [];
					_.each(tasks, function (x) {
						var initialHours = parseInt(x.initialHours);
						var hoursLeft = x.hoursLeft ? parseInt(x.hoursLeft): x.hoursLeft;
						var hoursToday = x.hoursToday ? parseInt(x.hoursToday) : x.hoursToday = 0;
						if (hoursLeft <= 0) {
							hoursLeft = 0;
						} else if (!hoursLeft) {
							hoursLeft = initialHours;
						} else {hoursLeft = hoursLeft - hoursToday};
						console.log(hoursLeft);
						batchRequests.push(

							{
							'method': 'PUT',
							'path'  : '/1/classes/Tasks/' + x.objectId,
							'body'	: {
								'initialHours'	: initialHours,
								'hoursToday'		: hoursToday,
								'hoursLeft'			: hoursLeft
								} // end body
							} // end object

						) // end push
					}); // end each loop
					var params = {
						'requests' : batchRequests
					};
					$('.toBeCleared').val('');
					$http.post('https://api.parse.com/1/batch/', params, PARSE_HEADERS).success( function (data) {
						$rootScope.$broadcast('taskHours:updated');
					});
				}; // end updateCurrentTask

				return {
					setInitialHours: setInitialHours,
					submitTodaysTimes: submitTodaysTimes
				}

			} // end function
		]); // end factory
}()); // end iif
(function(){

	angular.module('FinalProject')
		.factory('DailyInputFactory', ['$rootScope', '$http', 'PARSE_HEADERS', '$location', '$cookieStore',
			function ($rootScope, $http, PARSE_HEADERS, $location, $cookieStore){

				var listURL = 'https://api.parse.com/1/classes/Lists/';

				var getDailyData = function () {
					$cookieStore.get('currentUser');
					$cookieStore.get('currentList');
					return $http.get(listURL, PARSE_HEADERS);
					$rootScope.$broadcast('dailyUpdate:ran');
				};

				var dailyUpdate = function (list) {
					var user = $cookieStore.get('currentUser');
					PARSE_HEADERS = {
        		headers : {
          		'X-Parse-Application-Id': 'em1a4NnNesYbYgROEEOsuSpGbGuFkzazhHpyccNH',
			        'X-Parse-REST-API-Key': 'iLZI2A5USKe6XqNUhWNdHXSYJQApRNim3HpmA8YY',
          		'X-Parse-Session-Token' : user.sessionToken,
          		'Content-Type': 'application/json'
        		} // end headers
        	}; // end PARSE_HEADERS
        	var id = list.objectId;
        	var values = {'mon' : list.mon, 'tue' : list.tue, 'wed' : list.wed, 'thur' : list.thur, 'fri' : list.fri, };
        	$cookieStore.remove('currentList');
        	// need to update the cookie storage sometime
        	// before issuing broadcast
        	$cookieStore.put('currentList', list);
					return $http.put(listURL + id, values, PARSE_HEADERS)
						.success(function () {
							$rootScope.$broadcast('dailyUpdate:ran');
						}); // end success
				}; // end daily update			

				return {
					getDailyData: getDailyData,
					dailyUpdate: dailyUpdate
				};

			} // end function
		]); // end factory

}()); // end iif
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
(function(){

	angular.module('FinalProject')
		.controller('TaskAccordionControl', ['$scope',
			function ($scope) {

			} // end function
		]); // end controller
}()); // end iif
(function(){

	angular.module('FinalProject')
		.factory('d3Factory', [
			function () {

			} // end function
		]) // end factory

		.directive('barsChart', [ 
			function () {
				//explicitly creating a directive definition variable
    	 //this may look verbose but is good for clarification purposes
     	//in real life you'd want to simply return the object {...}
     	var directiveDefinitionObject = {
         //We restrict its use to an element
         //as usually  <bars-chart> is semantically
         //more understandable
         restrict: 'E',
         //this is important,
         //we don't want to overwrite our directive declaration
         //in the HTML mark-up
         replace: false,
         link: function (scope, element, attrs) {
           //converting all data passed thru into an array
           var data = attrs.chartData.split(',');
           //in D3, any selection[0] contains the group
           //selection[0][0] is the DOM node
           //but we won't need that this time
           var chart = d3.select(element[0]);
           //to our original directive markup bars-chart
           //we add a div with out chart stling and bind each
           //data entry to the chart
            chart.append("div").attr("class", "chart")
             .selectAll('div')
             .data(data).enter().append("div")
             .transition().ease("easeOut")
             .style("width", function(d) { return d + "%"; })
             .text(function(d) { return d + "%"; });
           //a little of magic: setting it's width based
           //on the data value (d) 
           //and text all with a smooth transition
         } 
      };
      return directiveDefinitionObject;
			} // end function
		]); // end directive

}()); // end of iif
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