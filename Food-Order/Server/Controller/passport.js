const passport = require("passport")
require("dotenv").config();

var GoogleStrategy = require('passport-google-oauth2').Strategy;


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "https://food-ordering-website-hx6e.onrender.com/auth/google/callback",
      passReqToCallback: true,
    },
    
    function (request, accessToken, refreshToken, profile, done) {
      done(null, profile)
    }
  )
);

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
});
