var app=angular.module('myApp', ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "main.html",
            controller: "flowerController"
        })
        .when("/edit", {
            templateUrl: "edit.html",
            controller: "editController"
        })
       .when("/basket", {
            templateUrl: "basket.html",
            controller: "flowerController"
        });
});