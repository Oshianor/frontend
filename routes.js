const routes = require('next-routes');


module.exports = routes()
  .add("index", "/")
  .add("Topic", "/topics/:topicId/:title")
  .add("Site", "/sites")
  .add("Login", "/login")
  .add("Recent", "/recent")
  .add("Register", "/register")
  .add("Profile", "/p/:username");
