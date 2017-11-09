var myApp = angular.module('myApp');
myApp.controller('editController', function($scope, $http, flowersFactory) {
    //    $scope.flowers = [];
    app.factory('flowersFactory', ['$http',
        function($http) {
            var basketFlowers = [];


            function loadFlowers(onLoad) {
                var flowers = [];

                $http.get('http://localhost:8000/flowers')
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
    $scope.img = '';
    $scope.name = '';
    $scope.descr = '';
    $scope.price = '';


    flowersFactory.loadFlowers(function(flowers) {
        $scope.flowers = flowers;
    });

    function getFlowerById(id) {
        function checkId(flower) {
            if (flower.id == id) {
                return true;
            }
            return false;
        }

        return $scope.flowers.find(checkId);
    }

    function deleteFlower(flowerId) {
        $http.get('http://localhost:8000/delflower/' + flowerId, {
            params: {
                id: flowerId
            }
        })
            .then(function successCallback(response) {
                console.log("Success!!! " + JSON.stringify(response.data));
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });
    }

    function toeditFlower(flowerId) {
        $http.get('http://localhost:8000/toeditflower/' + flowerId, {
            params: {
                id: flowerId
            }
        })
            .then(function successCallback(response) {
                console.log("Success!!! " + JSON.stringify(response.data));
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });
    }

    function editFlower() {
        let flower = getFlowerById($scope.id);
        flower.name = $scope.name;
        flower.descr = $scope.descr;
        flower.price = $scope.price;

        $http.get('http://localhost:8000/editflower', {
            params: {
                id: $scope.id,
                name: flower.name,
                descr: flower.descr,
                price: flower.price
            }
        }).then(function successCallback(response) {
            console.log("Success!!! " + JSON.stringify(response.data));
        }, function errorCallback(response) {
            console.log("Error!!! " + response.err);
        });
    }
    
    function updateFlowerImg(id, path) {
        // TODO: Update your array with path to the image
        
        let flower = getFlowerById(id);
        console.log(path);
        var str = path;
        var imgSrc = str.replace("public","");
        flower.img = imgSrc;
        console.log(flower);
    }
    
    function postImg(id) {
        var formData = new FormData();        
        formData.append('id', id);
        formData.append('filetoupload', $scope.file);
        $http.post('http://localhost:8000/fileupload', formData, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).then(function successCallback(response) {
            console.log("Success!!!" + response.data);
            updateFlowerImg(id, response.data);
            $scope.img = '';
            $scope.name = '';
            $scope.descr = '';
            $scope.price = '';
        }, function errorCallback(response) {
            console.log("Error!!!" + response.err);
        });
    }

    function addFlower() {
        $http.get('http://localhost:8000/addflower', {
            params: {
                name: $scope.name,
                descr: $scope.descr,
                price: $scope.price
            }
        }).then(function successCallback(response) {
            console.log("Success!!! " + JSON.stringify(response.data));

            postImg(response.data.insertId);
            
            $scope.flowers.push({
                id: response.data.insertId,
                img: '',
                name: $scope.name,
                descr: $scope.descr,
                price: $scope.price
            });
            console.log(JSON.stringify($scope.flowers));
        }, function errorCallback(response) {
            console.log("Error!!!" + response.err);
        });
    }

    $scope.removeItem = function(id) {
        let flower = getFlowerById(id);
        let flowerIndex = $scope.flowers.indexOf(flower);

        $scope.flowers.splice(flowerIndex, 1);
        deleteFlower(id);
    }

    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;
    $scope.hideform = true;

    $scope.editItem = function(id) {
        let flower = getFlowerById(id);
        $scope.hideform = false;
        $scope.id = id;
        //        if (id == 'new') {
        //            $scope.edit = true;
        //            $scope.incomplete = true;
        //            $scope.img = '';
        //            $scope.name = '';
        //            $scope.descr = '';
        //            $scope.price = '';
        //        } else {
        //            toeditFlower(id);
        $scope.edit = false;
        //            $scope.img = flower.img;
        $scope.name = flower.name;
        $scope.descr = flower.descr;
        $scope.price = flower.price;
        //        }
    };
    $scope.addItem = function() {
        $scope.id = null;
        $scope.hideform = false;
    }

    $scope.saveChanges = function(id) {
        if (id) {
            editFlower();
        } else {
            addFlower();
        }
    }
    $scope.categorys = ["A", "B", "C", "D"];
    $scope.addCat = function(cat) {
        $scope.categorys.push(cat);
    };
}).$inject = ["flowersFactory"];

myApp.directive('file', function() {
    return {
        scope: {
            file: '='
        },
        link: function(scope, el, attrs) {
            el.bind('change', function(event) {
                var file = event.target.files[0];
                scope.file = file ? file : undefined;
                scope.$apply();
            });
        }
    };
});