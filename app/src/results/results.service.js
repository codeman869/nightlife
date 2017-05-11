var app = angular.module('nightlife');

app.service('ResultsService', ResultsService);


ResultsService.$inject = ['$http', '$q'];

function ResultsService($http, $q) {
    var service = this;
    
    service.getResults = function(location) {
        return $q(function(resolve,reject){
        
            $http({
                
                method: 'GET',
                url: '/api/v1/business',
                params: location
                
            }).then(function(data){
                resolve(data.data);
            }, function(err){
                reject(err);
                
            });  
        });
        
        
    };

}