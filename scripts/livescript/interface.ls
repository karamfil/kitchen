l = console.log

NAVIGATION = [
	* title: 'Home'			href : '/'
	* title: 'Cookbook'		href : '/cookbook'
	* title: 'Fridge'		href : '/fridge'
]

app = angular.module \Kitchen, [\ngRoute, \ui.select2]

app.config [\$routeProvider, \$locationProvider, !($routeProvider, $locationProvider)->
	$routeProvider
		..when \/,						{ templateUrl: \/templates/home.html,			controller: \HomeCtrl }
		..when \/cookbook,				{ templateUrl: \/templates/cookbook.html,		controller: \CookbookCtrl }
		..when \/fridge,				{ templateUrl: \/templates/ingredients.html,	controller: \IngredientsCtrl }
		..otherwise 					{ templateUrl: \/templates/error.html }
	
	$locationProvider.html5Mode true
]

app.controller \BaseCtrl, [\$scope, \$http, \$route, !($scope, $http)->
	do $scope.set_title = !(title = '', heading = null)->
		$scope.title = "#title | Kitchen"
		$scope.heading = heading ? title
]

app.controller \NavigationCtrl, [\$scope, \$location, !($scope, $location)->
	$scope.items = NAVIGATION
	$scope.is_active = (loc)-> if loc is \/ + $location.path!split \/ .1 then \active else ''
]


app.controller \HomeCtrl, [\$scope, \$http, !($scope, $http)->
	$scope.set_title \Home 'Virtual Kitchen'
]

app.controller \CookbookCtrl, [\$scope, \$http, !($scope, $http)->
	$scope.set_title \Cookbook
]

app.controller \IngredientsCtrl, [\$scope, \$http, !($scope, $http)->
	$scope.set_title \Fridge
	
	$http.get \/data/ingredients-cats.json? .success !(data)->
		$scope.categories = data
	
	$http.get \/data/ingredients.json? .success !(data)->
		
		$scope.items = data
]