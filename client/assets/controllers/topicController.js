app.controller('topicController', function($scope, dashboardFactory, $location, $cookies, $routeParams){
  $scope.topic_id = $routeParams.id;
  $scope.user_id = $cookies.get('id');
  $scope.user_username = $cookies.get('username');
  $scope.logout = function(){
    $cookies.remove('username')
    $cookies.remove('id')
    $location.url('/')
  }
  $scope.showOneTopic = function(){
    factory.showOneTopic($scope.topic_id, function(data){
      if(data.err){
        console.log(data.err);
      }
      else{
        $scope.topic = data.topic;
      };
    });
  };
  $scope.showOneTopic();
  $scope.addPost = function(){
    $scope.post.user = $scope.user_id;
    $scope.post.username = $scope.user_username;
    $scope.post.topic = $scope.topic_id;
    factory.addPost($scope.post, function(data){
      if(data.err){
        console.log(data.err);
      }
      else{
        $scope.post = {};
        $scope.showOneTopic();
      };
    });
  };
  $scope.addComment = function(post, content){
    $scope.comment = {};
    $scope.comment.user = $scope.user_id;
    $scope.comment.username = $scope.user_username;
    $scope.comment.post = post;
    $scope.comment.content = content;
    factory.addComment($scope.comment, function(data){
      if(data.err){
      }
      else{
        $scope.comment = {};
        $scope.showOneTopic();
      };
    });
  };
  $scope.like = function(post_id){
    factory.like(post_id,$scope.user_id, function(data){
      if(data.err){
        console.log(data.err)
      }
      else{
        console.log(data.like)
        $scope.showOneTopic();
      }
    })
  }
  $scope.dislike = function(post_id){
    factory.dislike(post_id,$scope.user_id, function(data){
      if(data.err){
        console.log(data.err)
      }
      else{
        console.log(data.dislike)
        $scope.showOneTopic();
      }
    })
  }
})
