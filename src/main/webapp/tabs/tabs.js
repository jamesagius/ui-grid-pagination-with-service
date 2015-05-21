
app.controller('tabs1Ctrl', function ($scope, $state, $http,sharedDataService) {
  $scope.sharedData = sharedDataService;

    $scope.viewLoading = true;

    $http.get('data/getRemoteData').
        success(function(data, status, headers, config){
            $scope.remoteData = data;
            $scope.viewLoading = false;
        });

});

app.controller('tabsCtrl', function ($scope, $state, sharedDataService) {
  $scope.sharedData = sharedDataService;

   $scope.tabs = [
          { heading: "Tab 1", route:"tabs.tab1", active:false },
          { heading: "Tab 2", route:"tabs.tab2", active:false },
          { heading: "Tab 3", route:"tabs.tab3", active:false },
          { heading: "Tab 4", route:"tabs.tab4", active:false },
      ];

      $scope.go = function(route){
          $state.go(route);
      };

      $scope.active = function(route){
          return $state.is(route);
      };

      $scope.$on("$stateChangeSuccess", function() {
          $scope.tabs.forEach(function(tab) {
              tab.active = $scope.active(tab.route);
          });
      });

});

app.directive('myLoadingSpinner', function() {
    return {
      restrict: 'A',
      replace: true,
      transclude: true,
      scope: {
        loading: '=myLoadingSpinner'
      },
      templateUrl: 'tabs/loading.html',
      link: function(scope, element, attrs) {
        var spinner = new Spinner().spin();

        var queryResult = element[0].getElementsByClassName('my-loading-spinner-container');
        var loadingContainer = angular.element(queryResult[0]);
        loadingContainer.append(spinner.el);
      }
    };
 });