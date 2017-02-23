var dashboard = require('../controllers/dashboard.js')
module.exports = function(app){
  app.post('/user', dashboard.addUser),
  app.post('/topic', dashboard.addTopic),
  app.get('/topic', dashboard.showTopic),
  app.get('/topic/:id', dashboard.showOneTopic),
  app.post('/post', dashboard.addPost),
  app.post('/comment', dashboard.addComment),
  app.get('/user/:id', dashboard.showUser),
  app.put('/like', dashboard.Like),
  app.put('/dislike', dashboard.Dislike)
}
