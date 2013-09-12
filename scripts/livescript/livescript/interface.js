var Details_Controller, Education_Controller, Events_Controller, Skills_Controller, Freelance_Controller, Experience_Controller;
$(function(){});
Details_Controller = function($scope){
  $scope.data = DATA.details;
};
Education_Controller = function($scope){
  $scope.data = DATA.education;
};
Events_Controller = function($scope){
  $scope.data = DATA.events;
};
Skills_Controller = function($scope){
  $scope.data = DATA.skills;
};
Freelance_Controller = function($scope){
  $scope.data = DATA.freelance;
};
Experience_Controller = function($scope){
  $scope.data = DATA.experience;
};