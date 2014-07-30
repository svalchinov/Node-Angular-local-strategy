'use strict';

/* Controllers */
var myApp = angular.module('myApp.controllers', []);

myApp.controller("homeController", function($scope, AuthService) {
    $scope.message = "Home page";
});

myApp.controller("registerController", function($scope, $http) {
    $scope.message = "Sign up";
    $scope.user = {
        username: '',
        password: ''
    };
    $scope.submit = function() {
        $http.post("/api/user/register", $scope.user).then(function(data) {
            console.log(data);
        });
    }
});

myApp.controller("loginController", function($scope, $http, $location, AuthService) {
    $scope.message = "Login";
    $scope.user = {
        username: 'admin',
        password: 'test'
    };
    $scope.submit = function() {
        $http.post("/api/user/auth", $scope.user).then(function(result) {
            if(result.data.success) {
                $location.path("/user/welcome");
            }          
        });
    }
});

myApp.controller("logoutController", function($scope, $http, $location, AuthService) {
    $scope.message = 'Logging out';
    $http.get("/api/user/logout").then(function(result) {
        if(result.data.success) {
            AuthService.session.clearSession();
            $location.path("/login");
        }  
    });
});

myApp.controller("userController", function($scope, AuthService) {
    $scope.message = "Welcome " + AuthService.session.username;
});



