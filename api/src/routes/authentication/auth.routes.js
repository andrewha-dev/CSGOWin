const passport = require('passport');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.get('/steam', passport.authenticate('steam', { session: false }));

router.get('/steam/return', passport.authenticate('steam', { session: false }), (req, res) => {
  const token = jwt.sign({ user: req.user }, process.env.SECRET_KEY, { expiresIn: '2h' });
  console.log(token)
  res.render('authenticated', { jwtToken: token, clientUrl: process.env.FRONTEND_URL });
});

router.get('/isAuthenticated', (req, res) => {
  //First lets verify to see if there is a web token
  let token = req.header('Authorization');
  let isValid = false;
  isValid = isValidToken(token);
  res.contentType('application/json');
  res.json({isAuthenticated: isValid});
  res.end(200);
});

router.get('/logout');

//Helper function
let isValidToken = (token)=> {
  let isValid = false;
  try {
    var decoded = jwt.verify(token, process.env.SECRET_KEY);
    isValid = true;
  } catch(err) {
    return isValid;
  }
  return isValid;
}

module.exports = router;
