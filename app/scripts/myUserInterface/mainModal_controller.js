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

	.controller('ModalInstanceControl', ['$scope', '$modalInstance', 'ProjectFactory',
		function ($scope, $modalInstance, ProjectFactory) {

			$scope.addProject = function (project) {
				// to ProjectFactory
				ProjectFactory.addProject(project);
				$modalInstance.close();
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