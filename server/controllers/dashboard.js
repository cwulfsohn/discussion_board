var mongoose = require('mongoose')
var User = mongoose.model('User')
var Comment = mongoose.model('Comment')
var Post = mongoose.model('Post')
var Topic = mongoose.model('Topic')

module.exports = {
  addUser: function(request, response){
    User.findOne({username: request.body.username}, function(err, user){
      if(err){
        response.json({err: err})
      }
      else if(user){
        response.json({user: user})
        return
      }
      else{
    var user = new User({username: request.body.username})
    user.save(function(err, user){
      if(err){
        response.json({err: err})
      }
      else{
        response.json({user: user})
      }
    })
  }})},
  addTopic: function(request, response){
    User.findOne({_id: request.body.user_id},function(err, user){
      if(err){
        response.json({err: err})
      }
      else{
        var topic = new Topic({_user: user._id, name: request.body.name, description: request.body.description, category: request.body.category})
        topic.save(function(err, topic){
          if(err){
            response.json({err: err})
          }
          else{
            user.topics += 1;
            user.save()
            response.json({topic: topic})
          }
        })
      }
    })
  },
  showTopic: function(request, response){
    Topic.find({}).populate('_user').exec(function(err, topic){
      if(err){
        response.json({err: err})
      }
      else{
        response.json({topic: topic})
      }
    })
  },
  showOneTopic: function(request, response){
    Topic.findOne({_id: request.params.id}).populate("_user").populate("posts").populate({path: "posts", populate: {path: "comments"}}).exec(function(err, topic){
      if(err){
        response.json({err: err})
      }
      else{
        console.log(topic.posts)
        response.json({topic: topic})
      }
    })
  },
  addPost: function(request, response){
    User.findOne({_id: request.body.user}, function(err, user){
      if(err){
        response.json({err: err})
      }
      else{
        Topic.findOne({_id: request.body.topic}, function(err, topic){
          if(err){
            response.json({err: err})
          }
          else{
            var post = new Post({content: request.body.content, user: request.body.username, user_id: request.body.user})
            post.save(function(err, post){
              if(err){
                response.json({err: err})
              }
              else{
                user.posts += 1;
                user.save((err) => { console.log(err); })
                topic.posts.push(post)
                topic.save((err) => { console.log(err); })
                response.json({post: post})
              }
            })
          }
        })
      }
    })
  },
  addComment: function(request, response){
    User.findOne({_id: request.body.user}, function(err, user){
      if(err){
        response.json({err: err})
      }
      else{
        Post.findOne({_id: request.body.post}, function(err, post){
          if(err){
            response.json({err: err})
          }
          else{
            var comment = new Comment({content: request.body.content, user: request.body.username, user_id: request.body.user})
            comment.save(function(err, comment){
              if(err){
                response.json({err: err})
              }
              else{
                user.comments += 1
                user.save((err) => { console.log(err); })
                post.comments.push(comment)
                post.save((err) => { console.log(err); })
                response.json({comment: comment})
              }
            })
          }
        })
      }
    })
  },
  showUser: function(request, response){
    User.findOne({_id: request.params.id}, function(err, user){
      if(err){
        response.json({err: err})
      }
      else{
        response.json({user: user})
      }
    })
  },
  Like: function(request, response){
    Post.findOne({_id: request.body.post}, function(err, post){
      if(err){
        response.json({err:err})
      }
      else{
        post.like.push(request.body.user);
        post.save((err) => { console.log(err); })
        response.json({post: post})
      }
    })
  },
  Dislike: function(request, response){
    Post.findOne({_id: request.body.post}, function(err, post){
      console.log(post)
      if(err){
        response.json({err:err})
      }
      else{
        post.dislike.push(request.body.user);
        post.save((err) => { console.log(err); })
        response.json({post: post})
      }
    })
  }
}
