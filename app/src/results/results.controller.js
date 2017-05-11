var app = angular.module('nightlife');


app.controller('ResultsController', ResultsController);

ResultsController.$inject = ['ResultsService', 'LocationService', '$rootScope'];

function ResultsController(ResultsService, LocationService, $rootScope) {
    
    var ctrl = this;
    
    ctrl.results = [];
    
    $rootScope.$on('newLatLongPosition', function() {
        
        var location = LocationService.getCurrentPosition();
        getResultsLatLong(location.lat, location.long);
    });
    
    function getResultsLatLong(lat,long) {
        
        var location = new Object();
        
        location.lat = Number(lat);
        location.long = Number(long);
        
        ResultsService.getResults(location).then(function(data){
        
        ctrl.results = data;
        
        console.log(ctrl.results);
        
        });    
        
    };
    
    
    
}

