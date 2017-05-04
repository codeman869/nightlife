var app = angular.module('nightlife', []);


app.controller('MainController', MainController);
app.controller('ResultsController', ResultsController);
app.service('ResultsService', ResultsService);


MainController.$inject = [];

function MainController() {
    var ctrl = this;
    
    ctrl.text = "Welcome to Nightlife";
    ctrl.lat, ctrl.long = null, null;
    
    ctrl.location = "";
    
    ctrl.getLocation = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(ctrl.currentPosition)
        }
    }
    
    ctrl.currentPosition = function(position) {
        ctrl.lat = position.coords.latitude;
        ctrl.long = position.coords.longitude;
        
        console.log(ctrl.lat, ctrl.long);
    }
}