app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "index.html",
            controller: "flowerController"
        })
        .when("/edit", {
            templateUrl: "edit.html",
            controller: "flowerController"
        })
       .when("/bascket", {
            templateUrl: "bascket.html",
            controller: "flowerController"
        })
});