angular.module('teamlink_document_service', ['ngResource'])

.factory('DocumentService', ['$resource', function($resource) {
    
    // remote web service api
    function addItem(doc) {
        
    };

    function updateItem(doc) {
        
    };
    
    function removeItem(id) {
        
    };

    function allItems() {
        return $resource(host + 'api/document/:slug', {}, {
            query: {method:'GET', params:{slug:'list'}, isArray:true}
        });
    };
    
    function fetchItem(id) {
        
    };
    
    // wrapper
    
    return {
        add: addItem,
        update: updateItem,
        remove: removeItem,
        allItems: allItems,
        item: fetchItem
    };
}])