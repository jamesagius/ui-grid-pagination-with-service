app.controller('editCtrl', ['$scope','$q', '$http','$state','$stateParams','$modal','$log','sharedDataService',
    function($scope,$q,$http,$state,$stateParams,$modal,$log,sharedDataService) {

    $scope.sharedData = sharedDataService;
    var id = $stateParams.id;
    if (!id) {
            var modalInstance = $modal.open({
              templateUrl: 'editModalContent.html',
              controller: 'editModalInstanceCtrl',
              size: 'lg'
            });

            modalInstance.result.then(function (enteredRecordId) {
              $scope.sharedData.enteredRecordId = enteredRecordId;
              getRecord(enteredRecordId).then(function(res){
                    $scope.sharedData.name = res.data.name;
                    $scope.sharedData.gender = res.data.gender;
                });

            }, function () {
              $log.info('Modal dismissed at: ' + new Date());
            });

    } else {
        getRecord(id).then(function(res){
            $scope.sharedData.name = res.data.name;
            $scope.sharedData.gender = res.data.gender;
        });
    }

    function getRecord(id) {
        return $http.get('data/getRecord?name='+id);
    }

    $scope.doEdit = function(row) {
        alert(row.name);
    }

}]);

app.controller('editModalInstanceCtrl', function ($scope, $modalInstance, sharedDataService) {

  $scope.sharedData = sharedDataService;

  $scope.ok = function () {
    $modalInstance.close($scope.enteredRecordId);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});