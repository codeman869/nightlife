var app = angular.module('nightlife');

app.service('LocationService', LocationService);

LocationService.$inject = ['$q', '$rootScope'];

function LocationService($q, $rootScope) {
    
    var service = this;
    
    service.lat; service.long
    
    service.getLocation = function() {
        
        return $q(function(resolve,reject){
            
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve);
            } else {
                
                reject(new Error('Geolocation not supported'));
                
            }
            
            
            
            
        });
        
        
        
    };
    
    service.setCurrentPosition = function(lat, long) {
        service.lat = lat;
        service.long = long;
        
        $rootScope.$broadcast('newLatLongPosition');
    };
    
    service.getCurrentPosition = function() {
        return {lat: service.lat, long: service.long};
    };
    
}