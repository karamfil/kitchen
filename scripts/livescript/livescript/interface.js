var l, NAVIGATION, app;
l = console.log;
NAVIGATION = [
  {
    title: 'Home',
    href: '/'
  }, {
    title: 'Cookbook',
    href: '/cookbook'
  }, {
    title: 'Fridge',
    href: '/fridge'
  }
];
app = angular.module('Kitchen', ['ngRoute', 'ui.select2']);
app.config([
  '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    var x$;
    x$ = $routeProvider;
    x$.when('/', {
      templateUrl: '/templates/home.html',
      controller: 'HomeCtrl'
    });
    x$.when('/cookbook', {
      templateUrl: '/templates/cookbook.html',
      controller: 'CookbookCtrl'
    });
    x$.when('/fridge', {
      templateUrl: '/templates/ingredients.html',
      controller: 'IngredientsCtrl'
    });
    x$.otherwise({
      templateUrl: '/templates/error.html'
    });
    $locationProvider.html5Mode(true);
  }
]);
app.controller('BaseCtrl', [
  '$scope', '$http', '$route', function($scope, $http){
    ($scope.set_title = function(title, heading){
      title == null && (title = '');
      heading == null && (heading = null);
      $scope.title = title + " | Kitchen";
      $scope.heading = heading != null ? heading : title;
    })();
  }
]);
app.controller('NavigationCtrl', [
  '$scope', '$location', function($scope, $location){
    $scope.items = NAVIGATION;
    $scope.is_active = function(loc){
      if (loc === '/' + $location.path().split('/')[1]) {
        return 'active';
      } else {
        return '';
      }
    };
  }
]);
app.controller('HomeCtrl', [
  '$scope', '$http', function($scope, $http){
    $scope.set_title('Home', 'Virtual Kitchen');
  }
]);
app.controller('CookbookCtrl', [
  '$scope', '$http', function($scope, $http){
    $scope.set_title('Cookbook');
  }
]);
app.controller('IngredientsCtrl', [
  '$scope', '$http', function($scope, $http){
    $scope.set_title('Fridge');
    $http.get('/data/ingredients-cats.json?').success(function(data){
      $scope.categories = data;
    });
    $http.get('/data/ingredients.json?').success(function(data){
      $scope.items = data;
    });
  }
]);