(function() {
    "use strict";

    angular.module("jko")
        .controller("jkoEditCtrl", function($scope, $state, $timeout, jkoFactory, $mdSidenav, $mdToast, $mdDialog) {

            var that = this;

            that.items = jkoFactory.ref;
            that.item = that.items.$getRecord($state.params.id);

            that.closeSidebar = closeSidebar;
            that.saveEdit = saveEdit;
            // var id = $state.params.id;
        

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
                $scope.sidenavOpen = false;
            }


            function saveEdit () {
                jkoFactory.fixCategories(that.item);

                that.items.$save(that.item).then(function () {
                    $scope.$emit('editItem', that.item);
                    $scope.sidenavOpen = false;
                });
                
            }

           
        });

})();
