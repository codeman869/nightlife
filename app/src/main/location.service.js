var app = angular.module('nightlife');

app.service('LocationService', LocationService);

LocationService.$inject = ['$q'];

function LocationService($q) {
    
    var service = this;
    
    service.getLocation = function() {
        
        return $q(function(resolve,reject){
            
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve);
            } else {
                
                reject(new Error('Geolocation not supported'));
                
            }
            
            
            
            
        });
        
        
        
    };
    
    service.currentPosition = function(position) {
        /*
        service.lat = position.coords.latitude;
        service.long = position.coords.longitude;
        
        console.log(ctrl.lat, ctrl.long);
        */
    };
    
}