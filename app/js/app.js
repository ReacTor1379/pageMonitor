'use strict';

define([
    'app',
    'modules/navbar/navbar',
    'modules/topbar/topbar',
    'common/services/routeResolver'
], function () {

    var app = angular.module('app', ['ngRoute', 'routeResolverServices']);

    app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider',
        function ($routeProvider, routeResolverProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider) {

            //Change default views and controllers directory using the following:
            routeResolverProvider.routeConfig.setBaseDirectories('partials/', 'js/modules/');

            app.register =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            //Define routes - controllers will be loaded dynamically
            var route = routeResolverProvider.route;

            $routeProvider
                //route.resolve() now accepts the convention to use (name of controller & view) as well as the 
                //path where the controller or view lives in the controllers or views folder if it's in a sub folder. 
                //For example, the controllers for customers live in controllers/customers and the views are in views/customers.
                //The controllers for orders live in controllers/orders and the views are in views/orders
                //The second parameter allows for putting related controllers/views into subfolders to better organize large projects
                //Thanks to Ton Yeung for the idea and contribution
                .when('/test', {templateUrl:'partials/test.html'})
                .when('/dashboard', route.resolve('dashboard', 'dashboard/'))
                .when('/harViewer', route.resolve('harViewer', 'harviewer/'))
                .when('/test', route.resolve('test', 'test/'))
                .otherwise({redirectTo: '/test'});
    }]);

    return app;

});

