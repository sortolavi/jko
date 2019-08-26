angular.module('jko', ['ngMaterial', 'ui.router', 'firebase'])
    .config(function($mdThemingProvider, $stateProvider, $locationProvider) {

        // $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');

        $mdThemingProvider
            .theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('orange');

        $stateProvider
            .state('jko', {
                url: '/jko',
                templateUrl: 'components/jko/jko.tpl.html',
                controller: 'jkoCtrl as vm'
            })
            .state('jko.login', {
                url: '/login',
                templateUrl: 'components/jko/login/jko.login.tpl.html',
                controller: 'jkoLoginCtrl as vm'
            })
            .state('jko.new', {
                url: '/uusi',
                templateUrl: 'components/jko/new/jko.new.tpl.html',
                controller: 'jkoNewCtrl as vm'
            })
            .state('jko.edit', {
                url: '/muokkaa/:id',
                templateUrl: 'components/jko/edit/jko.edit.tpl.html',
                controller: 'jkoEditCtrl as vm',
                params: {
                    item: null,
                    items: null
                }
            });

    });
    
