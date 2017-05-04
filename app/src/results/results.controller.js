var app = angular.module('nightlife');


app.controller('ResultsController', ResultsController);

ResultsController.$inject = ['ResultsService'];

function ResultsController(ResultsService) {
    
    var ctrl = this;
    
    ctrl.results = [];
    
    ResultsService.getResults().then(function(data){
        
        ctrl.results = data;
        
        console.log(ctrl.results);
        
    });
    
}

