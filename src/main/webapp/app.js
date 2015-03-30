var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.pagination','ui.grid.selection','ui.grid.expandable']);

app.factory('sharedDataService', function() {
      var d = {};
      return d;
});

app.controller('editCtrl', ['$scope', '$http','sharedDataService', function($scope,$http,sharedDataService) {
$scope.sharedData = sharedDataService;

$scope.doEdit = function(row) {
    alert(row.name);
}

}]);

app.controller('actionsCtrl', ['$scope', '$http','sharedDataService', function($scope,$http,sharedDataService) {
$scope.sharedData = sharedDataService;

$scope.alert = function(message) {
    alert(message);
}

}]);


app.controller('addCtrl', ['$scope', '$http','sharedDataService', function($scope,$http,sharedDataService) {
$scope.sharedData = sharedDataService;

   $scope.add = function() {
    $http.get('data/add')
    .success(function (data) {
      $scope.sharedData.gridOptions.totalItems =+ data.length;
      var firstRow = ($scope.sharedData.paginationOptions.pageNumber - 1)
                        * $scope.sharedData.paginationOptions.pageSize;
      console.log('firstRow: ' + firstRow);
      console.log('pageSize: ' + $scope.sharedData.paginationOptions.pageSize);
      console.log('slice: ' + (firstRow + $scope.sharedData.paginationOptions.pageSize));
      $scope.sharedData.gridOptions.data =
            data.slice(firstRow, firstRow + $scope.sharedData.paginationOptions.pageSize);
    });

   }}]);

app.controller('MainCtrl', ['$scope', '$http', 'uiGridConstants', 'sharedDataService',
function($scope, $http, uiGridConstants, sharedDataService) {

$scope.sharedData = sharedDataService;

  $scope.sharedData.paginationOptions = {
    pageNumber: 1,
    pageSize: 5,
    sort: null,
    field: 'name'
  };

  $scope.sharedData.gridOptions = {
    data: [],
    paginationPageSizes: [5, 10, 15],
    paginationPageSize: 5,
    useExternalPagination: true,
    useExternalSorting: true,
    enableRowSelection: true, enableRowHeaderSelection: false,
     expandableRowTemplate: 'expandRowTemplate.html',
    expandableRowHeight: 150,
    //subGridVariable will be available in subGrid scope
    expandableRowScope: {
        subGridVariable: 'subGridScopeVariable'
    },
    columnDefs: [
      { name: 'name' },
      { name: 'gender', enableSorting: true },
      { name: 'company', enableSorting: true },
      { name: 'Actions', enableSorting: false, cellTemplate: 'actions.html' }
    ],
    onRegisterApi: function(gridApi) {
      $scope.gridApi = gridApi;
      $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
        if (sortColumns.length == 0) {
          $scope.sharedData.paginationOptions.sort = null;
        } else {
        console.log(sortColumns[0].field);
            $scope.sharedData.paginationOptions.field = sortColumns[0].field;
          $scope.sharedData.paginationOptions.sort = sortColumns[0].sort.direction;
        }
        getPage();
      });

      gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
        $scope.sharedData.paginationOptions.pageNumber = newPage;
        $scope.sharedData.paginationOptions.pageSize = pageSize;
        getPage();
      });

       gridApi.expandable.on.rowExpandedStateChanged($scope, function (row) {
          if (row.isExpanded) {
          $http.get('data/getRecord?name=' + row.entity.name)
            .success(function(data) {
                row.entity.allFields = data;
            });
          }
      });

    }
  };

  var getPage = function() {

    $http.get('data/get?sortDir='+$scope.sharedData.paginationOptions.sort+'&sortField='+
                                                    $scope.sharedData.paginationOptions.field)
    .success(function (data) {

      $scope.sharedData.gridOptions.totalItems = data.length;
      var firstRow = ($scope.sharedData.paginationOptions.pageNumber - 1) * $scope.sharedData.paginationOptions.pageSize;

            console.log('firstRow: ' + firstRow);
            console.log('pageSize: ' + $scope.sharedData.paginationOptions.pageSize);
            console.log('slice: ' + (firstRow + $scope.sharedData.paginationOptions.pageSize));

      $scope.sharedData.gridOptions.data = data.slice(firstRow, firstRow + $scope.sharedData.paginationOptions.pageSize);
    });
  };

  getPage();
}
]);
