var app = angular.module('nightlife');


app.controller('MainController', MainController);


MainController.$inject = ['LocationService'];

function MainController(LocationService) {
    var ctrl = this;
    
    ctrl.text = "Welcome to Nightlife";
    ctrl.lat, ctrl.long = null, null;
    
    ctrl.location = "";
    
    ctrl.getLocation = function(useCurrent) {
        
        if(useCurrent) {
            LocationService.getLocation().then(function(position){
            
                ctrl.lat = position.coords.latitude;
                ctrl.long = position.coords.longitude;
            
            }, function(err){
            
                console.log(err);
            
            });
            
        }
        
    };
    
}