'use strict';

/* Services */
var servicesModule = angular.module('myApp.services', []);

servicesModule.service("AuthService", function($http, $rootScope) {
	return {		
		session: {
			checkAuthentication: function() {
				return $http.get("/api/user/auth/result");
			},
			createSession: function(data){
				this.username = data.username;
				$rootScope.isAuthenticated = data.success;
			},
			clearSession: function() {
				this.username = '',
				$rootScope.isAuthenticated = false
			}
		}

	}
});