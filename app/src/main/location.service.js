var app = angular.module('nightlife');

app.service('LocationService', LocationService);

LocationService.$inject = ['$q', '$rootScope'];

function LocationService($q, $rootScope) {
    
    var service = this;
    
    service.lat; service.long
    
    service.getGeoLocation = function() {
        
        return $q(function(resolve,reject){
            
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve, reject, {timeout: 10000});
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
    
    service.setLocation = function(location) {
        service.location = location;
        
        $rootScope.$broadcast('newLocation');
    };
    
    service.getLocation = function() {
        return service.location;  
    };
}