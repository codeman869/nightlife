var app = angular.module('nightlife', []);


app.controller('MainController', MainController);


MainController.$inject = ['$scope'];

function MainController($scope) {
    $scope.text = "AngularJS is working";
}