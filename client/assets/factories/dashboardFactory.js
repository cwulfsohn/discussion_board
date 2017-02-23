app.factory("dashboardFactory", function($http){
  factory = {};
  factory.addUser = function(user, callback){
    $http.post('/user', user).then(function(data){
      callback(data.data);
    });
  };
  factory.addTopic = function(topic, callback){
    $http.post('/topic', topic).then(function(data){
      callback(data.data);
    });
  };
  factory.showTopic = function(callback){
    $http.get('/topic').then(function(data){
      callback(data.data);
    });
  };
  factory.showOneTopic = function(topic_id, callback){
    $http.get('/topic/'+topic_id).then(function(data){
      callback(data.data);
    });
  };
  factory.addPost = function(post, callback){
    $http.post('/post', post).then(function(data){
      callback(data.data)
    })
  }
  factory.addComment = function(comment, callback){
    $http.post('/comment', comment).then(function(data){
      console.log(data)
      callback(data.data)
    })
  }
  factory.showUser = function(user, callback){
    $http.get('/user/'+user).then(function(data){
      callback(data.data)
    })
  }
  factory.like = function(post, user,callback){
    $http.put('/like', {post: post, user: user}).then(function(data){
      callback(data.data)
    })
  }
  factory.dislike = function(post, user,callback){
    console.log(user)
    $http.put('/dislike', {post: post, user: user}).then(function(data){
      callback(data.data)
    })
  }
  return factory;
})
