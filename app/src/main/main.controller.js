var app = angular.module('nightlife');


app.controller('MainController', MainController);


MainController.$inject = ['LocationService'];

function MainController(LocationService) {
    var ctrl = this;
    
    ctrl.text = "Welcome to Nightlife";
    ctrl.lat, ctrl.long = null, null;
    ctrl.error = '';
    ctrl.location = "";
    
    ctrl.getLocation = function(useCurrent) {
        ctrl.error = '';
        if(useCurrent) {
            LocationService.getGeoLocation().then(function(position){
            
                ctrl.lat = position.coords.latitude;
                ctrl.long = position.coords.longitude;
                
                LocationService.setCurrentPosition(ctrl.lat,ctrl.long);
            
            }, function(err){
            
                //console.log(err);
                
                ctrl.error = err;
            
            });
            
        } else {
            LocationService.setLocation(ctrl.location);
        }
        
    };
    
}