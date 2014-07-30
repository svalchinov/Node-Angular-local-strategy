'use strict';

var myApp = angular.module('myApp', ['ngRoute', 'myApp.controllers', 'myApp.services']);

myApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: '/views/home.html',
        controller: 'homeController'
    });
    $routeProvider.when('/login', {
        templateUrl: '/views/login.html',
        controller: 'loginController'
    });
    $routeProvider.when('/register', {
        templateUrl: '/views/register.html',
        controller: 'registerController'
    });
    $routeProvider.when('/user/welcome', {
        templateUrl: '/views/user.html',
        controller: 'userController'
    });
    $routeProvider.when('/user/logout', {
        templateUrl: '/views/home.html',
        controller: 'logoutController'
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
});


myApp.run(function($rootScope, $location, $window, $http, AuthService) { 
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        AuthService.session.checkAuthentication().then(function(result){
            console.log(result.data);            
            if (result.data.success) {
                AuthService.session.createSession(result.data);                 
            }
            else {
                AuthService.session.clearSession();
            }
        });
    });
});