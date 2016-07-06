var app = angular.module('pokedexApp', [])

	.controller('appCtrl', ['$scope', '$http', function($scope, $http) {    
		$scope.spinner = true;
		$scope.mainContent = false;
		$scope.favourites = [];
		var items = 0;

			$scope.get = function() {
				items+=12;
				return $http.get('http://pokeapi.co/api/v1/pokemon/?limit='+items);
			};

			$scope.loadMore = function(){
				$scope.get().success(function(response) {
					$scope.data = response.objects;
					$scope.checkLikesAndSet($scope.data);
					$scope.spinner = false;
	            	$scope.mainContent = true;
				})
				.error(function(error) {
					alert('We are sorry! Please come back tomorrow.');
				})
			}

			$scope.like = function(index) {
				$scope.data[index].like = !$scope.data[index].like;
				localStorage[$scope.data[index].national_id] = $scope.data[index].like;
			}

			$scope.checkLikesAndSet = function(data) {
				$scope.favourites = [];
				data.forEach(function(item, i) {
					if (localStorage[item.national_id] && JSON.parse(localStorage[item.national_id])) {
						item.like = true;
						$scope.favourites.push(item);
					} else {
						item.like = false;
					}
				});

				return $scope.favourites;
			}

			$scope.showFavourites = function() {
				if ($scope.viewFavourites && $scope.viewFavourites.length) {
					$scope.viewFavourites = [];
				} else {
					$scope.viewFavourites = $scope.checkLikesAndSet($scope.data);
				}
			}

	    $scope.loadMore();

	}])

	.filter("type", function () {
		return function(data, type) {
			if (angular.isArray(data) && angular.isString(type)) {
            	var arr = [];
           		for (var i = 0; i < data.length; i++){
            		for (var j = 0; j < data[i].types.length; j++) {
                		if (data[i].types[j].name == type) {
                    		arr.push(data[i]);
                		}
            		}
        		} return arr;
			} else {
				return data;
			}
		}
	});