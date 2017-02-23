app.controller('profileController', function($scope, dashboardFactory, $location, $cookies, $routeParams){
  $scope.logout = function(){
    $cookies.remove('username')
    $cookies.remove('id')
    $location.url('/')
  }
  $scope.profile_id = $routeParams.id
  $scope.showUser = function(){
    dashboardFactory.showUser($scope.profile_id, function(data){
      if(data.err){
        consolelog(data.err)
      }
      else{
        console.log(data.user)
      $scope.user = data.user;
      }
    })
  }
  $scope.showUser();
})
