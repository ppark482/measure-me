(function(){

	angular.module('FinalProject')

		.controller('MainModalControl', function ($scope, $modal, $log) {

		  $scope.open = function () {

		    var modalInstance = $modal.open({
		      templateUrl: 'templates/add_modal_template.html',
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
				console.log('Project Added');
				console.log(project);

			}; // end addProject

			$scope.confidence = [
				

			]

	}) // end controller

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