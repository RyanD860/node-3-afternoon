const users = require("./../models/users");

let id = 1;

module.exports = {
  login: (req, res, next) => {
    const { session } = req;
    const { username, password } = req.body;

    const user = users.find(
      user => user.username === username && user.password === password
    );

    if (user) {
      session.user.username = user.username;
      res.status(200).send(session.user);
    } else {
      res.status(500).send("Unauthorized.");
    }
  },

  register: function(req, res, next) {
    users.push({
      id: id,
      username: req.body.username,
      password: req.body.password
    });

    id++;
    req.session.user.username = req.body.username;
    res.status(200).send(req.session.user);
  },

  signout: function(req, res, next) {
    req.session.destroy();
    res.status(200).send(req.session);
  },

  getUser: function(req, res, next) {
    res.status(200).send(req.session.user);
  }
};
