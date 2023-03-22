const { Managers } = require("../data/managers");

let auth = (req, res, next) => {
  let token = req.cookies.x_auth;

  Managers.findByToken(token, (err, manager) => {
    if(err) throw err;
    if(!manager) return res.json({ isAuth: false, error: true })
    req.token = token;
    req.manager = manager;
    next();
  })
}

module.exports = { auth };