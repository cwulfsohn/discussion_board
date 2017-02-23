app.controller('homeController', function($scope, dashboardFactory, $location, $cookies){
  $scope.user = $cookies.get('username')
  $scope.id = $cookies.get('id')
  $scope.logout = function(){
    $cookies.remove('username')
    $cookies.remove('id')
    $location.url('/')
  }
  $scope.showTopic = function(){
    dashboardFactory.showTopic(function(data){
      console.log(data)
      $scope.topics = data.topic
    })
  }
  $scope.showTopic();
  $scope.addTopic = function(){
    $scope.topic.user_id = $scope.id
    dashboardFactory.addTopic($scope.topic, function(data){
      if(data.err){
        console.log(data.err)
      }
      else{
        $scope.topic={};
        $scope.showTopic();
      }
    })
  }

})
