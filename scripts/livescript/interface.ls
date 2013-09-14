l = console.log

NAVIGATION = [
	* title: 'Home'				href : '/'
	* title: 'Cookbook'			href : '/cookbook'
	* title: 'Fridge'			href : '/fridge'
	* title: 'Shopping List'	href : '/shopping-list'
]

app = angular.module \Kitchen, [\ngRoute, \ui.select2]

app.config [\$routeProvider, \$locationProvider, !($routeProvider, $locationProvider)->
	$routeProvider
		..when \/,						{ templateUrl: \/templates/home.html,			controller: \HomeCtrl }
		..when \/cookbook,				{ templateUrl: \/templates/cookbook.html,		controller: \CookbookCtrl }
		..when \/fridge,				{ templateUrl: \/templates/products.html,		controller: \ProductsCtrl }
		..otherwise 					{ templateUrl: \/templates/error.html }
	
	$locationProvider.html5Mode true
]

app.controller \BaseCtrl, [\$scope, \$http, !($scope, $http)->
	do $scope.set_title = !(title = '', heading = title)->
		$scope.title = "#title | Kitchen"
		$scope.heading = heading
	
	$scope.load_data = ($scope, file, varable = file)-> $http.get "/data/#file.json?" .success !(data)-> $scope[varable] = data
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
	
	$scope.load_data($scope, \products)
	$scope.load_data($scope, \meals_cats)
	$scope.load_data($scope, \meals)
	
	$scope.is-filtered = (data) ->
		show = true
		if $scope.search?
			
			if show and $scope.search.title?
				show = data.title.toLowerCase!indexOf($scope.search.title) >= 0
			
			if show and $scope.search.category_id? and $scope.search.category_id
				show = (parseInt $scope.search.category_id) == data.category_id
			
			if show and $scope.search.products?
				for i in $scope.search.products
					if (parseInt i) not in data.products then show = false; break
		
		show
	
]

app.controller \ProductsCtrl, [\$scope, \$http, !($scope, $http)->
	$scope.set_title \Fridge
	
	$scope.load_data($scope, \products_cats)
	$scope.load_data($scope, \products)
]