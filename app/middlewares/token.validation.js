module.exports.tokenValidation = (req, res, next) => {
  let token = JSON.parse(localStorage.getItem('default_auth_token'));
  if (!token) {
    return req.sendStatus(401);
  } else {
    next();
  }
}
