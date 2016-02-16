vgilantApp.controller('ServiceController', ServiceController);

function ServiceController() {
    var self = this;
    // list of `service` value/display objects
    self.services = [];
    loadServices();
    self.querySearch = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange = searchTextChange;
    self.newService = newService;

    function newService(service) {
        alert("Sorry! creating a new service " + service + " is not yet supported!");
    }
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for services.
     */
    function querySearch(query) {
        var results = query ? self.services.filter(createFilterFor(query)) : self.services;
        return results;
    }

    function searchTextChange(text) {
        
    }

    function selectedItemChange(item) {
        
    }
    /**
     * Build `states` list of key/value pairs
     */
    function loadServices() {
    	// call REST backend
    	$.getJSON('/rest/services', function(data){
    		self.services = data.map(function(service){
    			return {
    				value: service.name.toLowerCase(),
    				display: service.name
    			};
    		});
    	});
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(service) {
            return (service.value.indexOf(lowercaseQuery) === 0);
        };
    }
}
