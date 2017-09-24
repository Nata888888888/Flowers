var app=angular.module('myApp', ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "main.html",
            controller: "flowerController"
        })
        .when("/edit", {
            templateUrl: "edit.html",
            controller: "flowerController"
        })
       .when("/basket", {
            templateUrl: "basket.html",
            controller: "flowerController"
        });
});