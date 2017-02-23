app.controller('loginController', function($scope, dashboardFactory, $location, $cookies){
  $scope.addUser = function(){
    dashboardFactory.addUser($scope.user, function(data){
      if(data.err){
        $scope.error = data.err
      }else{
        $cookies.put('id', data.user._id)
        $cookies.put('username', data.user.username)
        $location.url('/home')
      }
    })
  }
})
