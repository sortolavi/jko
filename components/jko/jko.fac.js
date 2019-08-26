(function () {
	"use strict";

	angular.module("jko")
		.factory("jkoFactory", function($http, $firebaseArray){

			// function getItems () {
			// 	return $http.get('data/items.json');// handle promises at controller
			// }

			var ref = firebase.database().ref('items'); // 'items' subfolder at firebase
			var items = $firebaseArray(ref);
			var categories = getCategories(items);

			function fixCategories (item) {
                // fix categories to include only kosher values
                if (item.categories) {
                    var arr = item.categories.toString().split(',');

                    arr = arr.map(function(s) {
                        return s.trim(); });

                    // strip empty values away, http://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
                    item.categories = arr.filter(function(e) {
                        return e; });

                    categories = _.uniq(categories.concat(item.categories));
                }
                // return item;
            }


            /*
            | param: array of objects
            | return: an array of all unique categories collected from all objects
            */
            function getCategories(items) {
                var cat_arr = [];

                angular.forEach(items, function(item) {

                    angular.forEach(item.categories, function(category) {
                        cat_arr.push(category);
                    });
                });
                // lodash helper function to remove all duplicates
                return _.uniq(cat_arr).sort();
            }



			return {
				ref: $firebaseArray(ref),
				getCategories: getCategories,
				fixCategories: fixCategories
			};
		});

})();


