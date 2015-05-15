
app.controller('testCtrl', function ($scope, sharedDataService) {
  $scope.sharedData = sharedDataService;
});

app.directive('testingtrans', function($log) {
  return {
    restrict: 'E',
    templateUrl: 'partials/testing.html'
  };
});

app.directive('usercomps', function($log) {

  function link(scope, element, attrs) {
            var boxes = '';
            boxes = "<span>Select Compartments</span><br>";

            for (var i = 0;i < scope.sharedData.comps.length;i++){
                boxes += "<input type='checkbox' id='" + scope.sharedData.comps[i] +
                 "' ng-click='selector($event)'>" + scope.sharedData.comps[i] + "<br>";
            }
            element.html(boxes);
  }

  return {
    template : "<div class='usercomps' ng-transclude></div>",
    transclude: true,
    restrict: 'E',
    link: link
    };
})

app.service('accessService',function($q) {
    this.verify = function(lacs) {
        var deferred = $q.defer();
        for (var i = 0;i < lacs.length; i++) {
            if (lacs[i] == 'E012333') {
                deferred.resolve(true);
                return deferred.promise;
            }
        }
        deferred.reject(false);
        return deferred.promise;
    }
});

app.controller('mainCtrl', ['$scope', '$http','$state','$modal','sharedDataService','accessService',
function($scope,$http,$state,$modal,sharedDataService,accessService) {
    $scope.sharedData = sharedDataService;

    $http.get('data/getUser').
      success(function(data, status, headers, config) {
        $scope.sharedData.lacs = data.lacs;
        $scope.sharedData.comps = data.comps;

        accessService.verify(data.lacs).then(
            function(success) {
                var modalInstance = $modal.open({
                  templateUrl: 'accessModalContent.html',
                  controller: 'accessModalInstanceCtrl'
                });

                modalInstance.result.then(
                    function (comps) {
                        console.log($scope.sharedData.selectedComps);
                    },
                    function (err) {

                    }
                );
            },
            function(fail) {
                alert('Not Authorized');
                window.location.assign('accessdenied.html');
            }
        );
      }).
      error(function(data, status, headers, config) {
        alert('error: ' + data);
      });

}]);

app.controller('accessModalInstanceCtrl', function ($scope, $modalInstance, sharedDataService) {

  $scope.sharedData = sharedDataService;

    $scope.myFilter = function (item) {
        return item === 'TK' || item === 'SI';
    };

  $scope.ok = function () {
    $modalInstance.close($scope.sharedData.selectedComps);
  };

});