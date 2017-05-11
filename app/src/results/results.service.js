var app = angular.module('nightlife');

app.service('ResultsService', ResultsService);


ResultsService.$inject = ['$http', '$q'];

function ResultsService($http, $q) {
    var service = this;
    
    service.getResults = function() {
        return $q(function(resolve,reject){
        
            $http.get('/api/v1/business').then(function(data){
                resolve(data.data);
            }, function(err){
                reject(err);
                
            });  
        });
        
        
    };

}