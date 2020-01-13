const passport = require('passport');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('../../models/user.model');

router.get('/steam', passport.authenticate('steam', { session: false }));

router.get('/steam/return', passport.authenticate('steam', { session: false }), (req, res) => {
  const token = jwt.sign({ user: req.user }, process.env.SECRET_KEY, { expiresIn: '2h' });
  console.log(token)
  res.render('authenticated', { jwtToken: token, clientUrl: process.env.FRONTEND_URL });
});

router.get('/isAuthenticated', async(req, res) => {
  //First lets verify to see if there is a web token
  //Declare user object
  let user = null;
  let token = req.header('Authorization');
  let isValid = false;
  isValid = isValidToken(token);
  if (isValid) {
    let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    user = await User.findOne({steamId: decodedToken.user.steamId});
    console.log(user);
  }
  res.contentType('application/json');
  res.json({user: user});
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
