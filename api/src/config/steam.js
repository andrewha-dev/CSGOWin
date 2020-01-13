const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const User = require('../models/user.model');
const Admin = require('../models/admin.model')

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
      let admin = await Admin.findOne({steamId: profile.id});

      //Check if the ID is in the variables
      //Should remove this code once its in production
      if (!admin) {
        if (profile.id == process.env.ADMIN_STEAM_ID) {
          admin = true
          Admin.create({steamId: profile.id})
        }
      } 
      //Otherwise we just go ahead and create the user
      if (!user) {
        user = await new User({
          steamId: profile._json.steamid,
          name: profile._json.personaname,
          avatar: profile._json.avatarmedium,
          balance: 0,
          isAdmin: !admin ? false : true 
        }).save();
      }

      return done(null, user);
    })
  );

  app.use(passport.initialize());
};
