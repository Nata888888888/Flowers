var myApp = angular.module('myApp');
myApp.controller('flowerController', function($scope, $http, $mdMedia, flowersFactory) {
    $scope.arrChoose = [];
    $scope.isMenuHidden = true;
    
    $scope.$watch(function() { return $mdMedia('gt-sm'); },
        function(isWider960) {
            $scope.isMenuHidden = isWider960;
    });

    flowersFactory.loadFlowers(function(flowers) {
        $scope.flowers = flowers;
        for (var i = 0; i < 5; i++) {
            $scope.arrChoose.push($scope.flowers[i]);
        };
    });

    $scope.arrFlower = [1, 2, 3];

    $scope.choosePage = function(index) {
        console.log(index);
        $scope.arrChoose = [];
        var a = 0 + index * 5;
        for (var i = a; i < (a + 5); i++) {
            $scope.arrChoose.push($scope.flowers[i]);
        }
    };
    //  $scope.flowers = [{
    //        img:'photo/redroses101.jpg',
    //        name: 'Троянда червона',
    //        descr: '101',
    //        price: '2200'
    //    },{
    //        img:'photo/roseswhite15.jpg',
    //        name: 'Троянда біла',
    //        descr: '15',
    //        price: '2200'
    //    },{
    //        img:'photo/roseryellow25.jpg',
    //        name: 'Троянда жовта',
    //        descr: '25',
    //        price: '2200'
    //    },{
    //        img:'photo/lily&roses15.jpg',
    //        name: 'Лілії та троянди',
    //        descr: '15',
    //        price: '2200'
    //    },{
    //        img:'photo/orcide7.jpg',
    //        name: 'Орхідеї',
    //        descr: '7',
    //        price: '2200'
    //    },{
    //        img:'photo/rosesbaj17.jpg',
    //        name: 'Троянди пастельні',
    //        descr: '17',
    //        price: '2200'
    //    },{
    //        img:'photo/alstromera15.jpg',
    //        name: 'Альстромери',
    //        descr: '15',
    //        price: '2200'
    //    },{
    //        img:'photo/fildflowers.jpg',
    //        name: 'Польові квіти',
    //        descr: '15',
    //        price: '2200'
    //    },{
    //        img:'photo/tulip25.jpg',
    //        name: 'Тюльпани',
    //        descr: '25',
    //        price: '2200'
    //    },{
    //        img:'photo/chrisantem13.jpg',
    //        name: 'Хризантеми',
    //        descr: '13',
    //        price: '2200'
    //    },{
    //        img:'photo/mixwhite&yellow.jpg',
    //        name: 'Квітковий мікс',
    //        descr: '35',
    //        price: '2200'
    //    },{
    //        img:'photo/pivon15.jpg',
    //        name: 'Півони',
    //        descr: '15',
    //        price: '2200'
    //    },{
    //        img:'photo/lilywhite7.jpg',
    //        name: 'Лілія біла',
    //        descr: '7',
    //        price: '2200'
    //    },{
    //        img:'photo/rosescolor35.jpg',
    //        name: 'Троянда кольорова',
    //        descr: '35',
    //        price: '2200'
    //    }];
    $scope.basketList = flowersFactory.basketFlowers;
//    $scope.count=$scope.basketList.length;
    $scope.addIntoBasket = function(id) {
        function checkId(flower) {
            if (flower.id == id) {
                return true;
            }
            return false;
        }
        let flower = $scope.flowers.find(checkId);
        flower.number = 1;
        $scope.basketList.push(flower);
    }
    $scope.hidemenu = function(){
        if (window.matchMedia("(max-width: 900px)").matches) {
            return true;
        }else{
            return false;
        }
    }
    $scope.selectBouqet = function(idx, id) {
        $scope.selBouqet = $scope.flowers[idx];
        $scope.addIntoBasket(id);
    }

    $scope.count = 0;
    $scope.count = function() {
        $scope.count++;
    }
    $scope.buy = function() {
        alert($scope.basketList.length);
    }
    $scope.countFlowers = function(){
        var sum = 0;
        
        for (let flower of $scope.basketList){
            sum += Number(flower.number);
        }
        
        return sum;
    }
        $scope.countPrice = function(){
        var sum = 0;
        
        for (let flower of $scope.basketList){
            sum += Number(flower.price * flower.number);
        }
        
        return sum;
    }
        $scope.getOrder = function(){
            $scope.order = new Array();
            let a = $scope.order;
            let b = $scope.basketList;
            let t = $scope.time;
            let p1 = $scope.phone1;
            let p2 = $scope.phone2;
            let adr = $scope.address;
            let s = $scope.sign;
            var dateControl = document.querySelector('input[type="datetime-local"]');
            var x=dateControl.value;
            console.log(x);
            a.push(b, p1, p2, adr, t, s);
            console.log(a);
        }
        $scope.backToSite = function (){
//            $modalInstance.dismiss('cancel'); 
             window.location.replace('http://localhost:8000/#!/');
        }
        $scope.basketClick = function () {
//            $('#myModal').dismiss('close');
            window.location = "#!basket";
        }
    
}).$inject = ["flowersFactory"];

//myApp.config(function($routeProvider) {
//    $routeProvider
//        .when("/", {
//            templateUrl: "main.html",
//            controller: "flowerController"
//        })
//        .when("/edit", {
//            templateUrl: "edit.html",
//            controller: "flowerController"
//        })
//       .when("/basket", {
//            templateUrl: "basket.html",
//            controller: "flowerController"
//        });
//});

myApp.directive("logoBlock", function() {
    return {
        replace: true,
        templateUrl: "/template/logo.html"
    };
});
myApp.directive("navBlock", function() {
    return {
        replace: true,
        templateUrl: "/template/nav.html"
    };
});
myApp.directive("promotionBlock", function() {
    return {
        replace: true,
        templateUrl: "/template/promotion.html"
    };
});
myApp.directive("sortBlock", function() {
    return {
        replace: true,
        templateUrl: "/template/sort.html"
    };
});
myApp.directive("goodsBlock", function() {
    return {
        replace: true,
        templateUrl: '/template/goods.html',
        restrict: 'E',
        link: function(scope, element, attrs) {
            var id = attrs["option"];
        }
    };
});
myApp.directive("paginationBlock", function() {
    return {
        replace: true,
        templateUrl: '/template/pagination.html'
    };
});
myApp.directive("modalBlock", function() {
    return {
        replace: true,
        templateUrl: '/template/modal.html'
    };
});
//  myApp.directive("sliderBlock", function(){
//        return{
//            replace: true,
//            templateUrl:'/template/slider.html'
//        };
//    });
myApp.directive("payBlock", function() {
    return {
        replace: true,
        templateUrl: '/template/pay.html'
    };
});
myApp.directive("deliveryBlock", function() {
    return {
        replace: true,
        templateUrl: '/template/delivery.html'
    };
});
myApp.directive("contactBlock", function() {
    return {
        replace: true,
        templateUrl: '/template/contact.html'
    };
});
myApp.directive("footerBlock", function() {
    return {
        replace: true,
        templateUrl: '/template/footer.html'
    };
});

