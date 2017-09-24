var myApp = angular.module('myApp');
myApp.controller('editController', function($scope, $http, flowersFactory) {
    $scope.flowers = [];
    
    flowersFactory.loadFlowers(function(flowers) {
        $scope.flowers = flowers;
    });

    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;
    $scope.hideform = true;
    $scope.editFlowers = function(id) {
        $scope.hideform = false;
        if (id == 'new') {
            $scope.edit = true;
            $scope.incomplete = true;
            $scope.fName = '';
            $scope.lName = '';
        } else {
            $scope.edit = false;
            $scope.fName = $scope.users[id - 1].fName;
            $scope.lName = $scope.users[id - 1].lName;
        }
    };

    $scope.$watch('img', function() {
        $scope.test();
    });
    $scope.$watch('name', function() {
        $scope.test();
    });
    $scope.$watch('descr', function() {
        $scope.test();
    });
    $scope.$watch('price', function() {
        $scope.test();
    });

    $scope.test = function() {
        if ($scope.passw1 !== $scope.passw2) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }
        $scope.incomplete = false;
//        if ($scope.edit && (!$scope.fName.length || !$scope.lName.length || !$scope.passw1.length || !$scope.passw2.length)) {
//            $scope.incomplete = true;
//        }
    };

}).$inject = ["flowersFactory"];