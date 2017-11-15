var myApp = angular.module('myApp');
app.factory('flowersFactory', ['$http',
    function($http) {
        var basketFlowers = [];
      

        function loadFlowers(onLoad) {
            var flowers = [];
            
            $http.get('flowers')
            .then(function successCallback(response) {
                flowers = response.data;
                onLoad(flowers);
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });
        }

        return {
            basketFlowers: basketFlowers,
            loadFlowers: loadFlowers
        }
    }
]);