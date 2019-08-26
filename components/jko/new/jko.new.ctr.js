(function() {
    "use strict";

    angular.module("jko")
        .controller("jkoNewCtrl", function($scope, $state, $timeout, jkoFactory, $mdSidenav, $mdToast, $mdDialog) {

            var that = this;
            
           
            that.closeSidebar = closeSidebar;
            that.saveItem = saveItem;

            $timeout(function () {
                $mdSidenav('left').open();
            });
            
            // https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$watch
            $scope.$watch('sidenavOpen', function (value) {

                if (value === false) {
                    $mdSidenav('left')
                        .close()
                        .then(function () {
                            $state.go('jko');
                        });
                }
            });


            function closeSidebar() {
                // that.item = {}; // to clear the form
                // that.editing = false;
                $scope.sidenavOpen = false;
            }


            function saveItem (item) {
                if (item) {
                    // send 'newItem' DOM upwards
                    $scope.$emit('newItem', item);
                    $scope.sidenavOpen = false;
                }
            }


        });

})();
