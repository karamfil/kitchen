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
  }, {
    title: 'Shopping List',
    href: '/shopping-list'
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
      templateUrl: '/templates/products.html',
      controller: 'ProductsCtrl'
    });
    x$.otherwise({
      templateUrl: '/templates/error.html'
    });
    $locationProvider.html5Mode(true);
  }
]);
app.controller('BaseCtrl', [
  '$scope', '$http', function($scope, $http){
    ($scope.set_title = function(title, heading){
      title == null && (title = '');
      heading == null && (heading = title);
      $scope.title = title + " | Kitchen";
      $scope.heading = heading;
    })();
    $scope.load_data = function($scope, file, varable){
      varable == null && (varable = file);
      return $http.get("/data/" + file + ".json?").success(function(data){
        $scope[varable] = data;
      });
    };
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
    $scope.load_data($scope, 'products');
    $scope.load_data($scope, 'meals_cats');
    $scope.load_data($scope, 'meals');
    $scope.isFiltered = function(data){
      var show, i$, ref$, len$, i;
      show = true;
      if ($scope.search != null) {
        if (show && $scope.search.title != null) {
          show = data.title.toLowerCase().indexOf($scope.search.title) >= 0;
        }
        if (show && $scope.search.category_id != null && $scope.search.category_id) {
          show = parseInt($scope.search.category_id) === data.category_id;
        }
        if (show && $scope.search.products != null) {
          for (i$ = 0, len$ = (ref$ = $scope.search.products).length; i$ < len$; ++i$) {
            i = ref$[i$];
            if (!in$(parseInt(i), data.products)) {
              show = false;
              break;
            }
          }
        }
      }
      return show;
    };
  }
]);
app.controller('ProductsCtrl', [
  '$scope', '$http', function($scope, $http){
    $scope.set_title('Fridge');
    $scope.load_data($scope, 'products_cats');
    $scope.load_data($scope, 'products');
  }
]);
function in$(x, arr){
  var i = -1, l = arr.length >>> 0;
  while (++i < l) if (x === arr[i] && i in arr) return true;
  return false;
}