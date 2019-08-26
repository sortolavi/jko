(function() {
    "use strict";

    angular.module("jko")
        .controller("jkoLoginCtrl", function($scope, $state, $timeout, jkoFactory, $mdSidenav, $mdToast, $mdDialog) {

            var that = this;
            
           
            that.closeSidebar = closeSidebar;
            that.login = login;

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


            function login (email, password) {
                
                firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function(firebaseUser) {
                    // console.log("Signed in as:", firebaseUser.uid);
                    var user = {};
                    user.id = firebaseUser.uid;
                    user.loggedin = true;
                    $scope.sidenavOpen = false;
                    $scope.$emit('login', user);
                    
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
             
              
                    if (errorCode === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else if(errorCode === 'auth/user-not-found') {
                        alert('User not found.');
                    } else {
                        console.error(error);
                    }

                    // $scope.sidenavOpen = false;
                });

                // jkoFactory.login(email, pw);
                // var user = jkoFactory.user;
                // $scope.$emit('login', user);
                // $scope.sidenavOpen = false;
            }


        });

})();
