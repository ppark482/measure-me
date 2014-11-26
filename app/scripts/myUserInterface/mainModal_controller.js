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
				}; // end scope.open

				$scope.addProject = function (project) {
					// to ProjectFactory
					ProjectFactory.addProject(project);
				}; // end addProject

			} // end function
		]) // end controller

	// $modalInstance represents a modal window (instance) dependency.
	// not the same as the $modal service used above.

	.controller('ModalInstanceControl', function ($scope, $modalInstance, items) {

	  $scope.ok = function () {
	    $modalInstance.close($scope.selected.item);
	  };

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
	}); // end controller

}()); // end of iif