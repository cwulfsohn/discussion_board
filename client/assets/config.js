var app = angular.module('app', ['ngRoute', 'ngCookies'])
app.config(function($routeProvider){
  $routeProvider
  .when("/", {
    templateUrl: "partials/login.html",
    controller: "loginController"
  })
  .when("/home", {
    templateUrl: "partials/home.html",
    controller: "homeController"
  })
  .when("/topic/:id", {
    templateUrl: "partials/topic.html",
    controller: "topicController"
  })
  .when("/profile/:id", {
    templateUrl: "partials/profile.html",
    controller: "profileController"
  })
  .otherwise({
    redirectTo: "/"
  })
});
