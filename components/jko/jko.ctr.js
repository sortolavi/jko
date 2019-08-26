(function() {
    "use strict";

    angular.module("jko")
        .controller("jkoCtrl", function($window, $timeout, $scope, $state, $http, jkoFactory, $mdSidenav, $mdToast, $mdDialog) {

            var that = this;
            

            that.adminStyle = false;
            that.propertyName = 'price';
            that.reverse = false;

            that.toInt = function (n) {
                return parseInt(n);
            };

            that.sortBy = function(propertyName) {
                // console.log(propertyName);
                that.reverse = (that.propertyName === propertyName) ? !that.reverse : false;
                // console.log(that.reverse);
                that.propertyName = propertyName;
            };

            that.mySort = function(a, b) {
                return a.value-b.value;
            };


            that.addNewItem = addNewItem;
            that.editItem = editItem;
            that.deleteItem = deleteItem;

            that.item = {};
            that.items = [];
            that.editing = false;


            
            // get all items from firebase
            that.items = jkoFactory.ref;
            that.items.$loaded().then(function (items) { // firebase $loaded: wait until all items have been loaded
                that.categories = jkoFactory.getCategories(items);
            });
            
           
            // when user has logged in successfully
            $scope.$watch('userLoggedIn', function (value) {

                if (value === true) {
                    var id = $scope.user.id;
                    $window.localStorage.setItem('user', id);
                    // make controls visible and change title color
                    that.adminStyle = true; 
                }
            });


            // when new item was handled at jko.new.ctr.js and 'newItem' was emitted there, it is actually added (=saved) here
            $scope.$on('newItem', function (event, item) {
                jkoFactory.fixCategories(item);
                that.items.$add(item).then(function () {
                    that.categories = jkoFactory.getCategories(that.items);
                });
            });



            // when edited item was saved at jko.edit.ctr.js and 'editItem' was emitted there
            $scope.$on('editItem', function (event, item) {
                // console.log($window.localStorage.getItem('user'));
                that.categories = jkoFactory.getCategories(that.items);
            });


            // succesfull login emitted from jko.login.ctr
            $scope.$on('login', function (event, user) {
                $scope.user = user;
                $timeout(function(){
                  // needs to run after dom rendering
                  $scope.$apply(function() {
                    // console.log(user.loggedin);
                    $scope.userLoggedIn = user.loggedin;
                  });
                });
            });

            
              

            function addNewItem() {
                // $mdSidenav('left').open();
                
                if($scope.userLoggedIn) {
                    $state.go('jko.new');
                } else {
                    $state.go('jko.login');
                } 
            }

            
            // $id references items firebase id hash
            function editItem(item) {
                // console.log(jkoFactory.user.loggedin);
                if($scope.userLoggedIn) {
                    $state.go('jko.edit', {
                        id: item.$id
                    });
                } else {
                    $state.go('jko.login');
                }
            }



            function deleteItem(evt, item) {
                if($scope.userLoggedIn) {
                    var name = item.name;
                    var dialog = $mdDialog.confirm()
                        .title('Poistetaanko ' + name + '?')
                        .ok('Kyllä')
                        .cancel('Ei')
                        .targetEvent(evt);

                    // show method returns promise, which is handed to function depending if ok or cancel
                    $mdDialog.show(dialog).then(
                    function() {
                        // that.items.splice(that.items.indexOf(item), 1);
                        // that.categories = getCategories(that.items);

                        that.items.$remove(item).then(function () {
                            // console.log("item is now removed, lets remove all referring categories too.");
                            that.categories = jkoFactory.getCategories(that.items);
                        });
                    },
                    function() {
                        // if cancelled
                    });
                } else {
                    $state.go('jko.login');
                }
            }

/*
            // populate firebase with data

            var data = [
            {
                "id": 1,
                "name": "Käringören",
                "price": 120000,
                "desc": "Mökki tai huvila, Parainen, Kittuis, Käringören 3h+kk, 40,0 m2",
                "image": "http://d3ls91xgksobn.cloudfront.net/651x434,fit/etuovimedia/images/property/import/526/549526/0e76b9541118d347871c0e0e51d244c4/9540df19071329add28320afc616a0b1/ORIGINAL.jpeg",
                "url": "http://www.etuovi.com/kohde/9462394",
                "images": "http://www.etuovi.com/kohde/9462394/kuvat",
                "categories": [
                    "mökki",
                    "asunto"
                ],
                "date": "2017-03-21"
            },{
                "id": 2,
                "name": "Käringören",
                "price": 120000,
                "desc": "Mökki tai huvila, Parainen, Kittuis, Käringören 3h+kk, 40,0 m2",
                "image": "http://d3ls91xgksobn.cloudfront.net/651x434,fit/etuovimedia/images/property/import/526/549526/0e76b9541118d347871c0e0e51d244c4/9540df19071329add28320afc616a0b1/ORIGINAL.jpeg",
                "url": "http://www.etuovi.com/kohde/9462394",
                "images": "http://www.etuovi.com/kohde/9462394/kuvat",
                "categories": [
                    "vene",
                    "asunto"
                ],
                "date": "2017-03-21"
            }];

            var firebase = jkoFactory.ref;

            angular.forEach(data, function(item){
                firebase.$add(item);
            });
*/

        });

})();

