const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const User = require('../models/user.model');

const strategyOptions = {
  returnURL: `${process.env.BASE_URL}/auth/steam/return`,
  realm: `${process.env.BASE_URL}`,
  apiKey: process.env.STEAM_API_KEY,
  stateless: true,
};

module.exports = app => {
  passport.use(
    new SteamStrategy(strategyOptions, async (identifier, profile, done) => {
      profile.identifier = identifier;

      console.log(profile)
      let user = await User.findOne({ steamId: profile.id });
      if (!user) {
        user = await new User({
          steamId: profile._json.steamid,
          name: profile._json.personaname,
          avatar: profile._json.avatar
        }).save();
      }

      return done(null, user);
    })
  );

  app.use(passport.initialize());
};
