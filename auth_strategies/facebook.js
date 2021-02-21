const passport = require("passport");
const facebookStrategy = require('passport-facebook').Strategy;

const mongo = require("../models/pool");


//for cookie purpose after login
passport.serializeUser((user,done)=>{
  // console.log(user,user.id);
  done(null,user.id)
})
//again visit the page
passport.deserializeUser((id,done)=>{
  // console.log(id);
  mongo.findById(id).then(user=>{
    done(null,user)
  })
})


passport.use(new facebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8000/auth/facebook/redirect"
  },
  function(accessToken, refreshToken, profile, done) {
    // console.log(profile);
    mongo.findOne({facebook_id:profile.id}).then(currentUser=>{
      // console.log(data);
      if(currentUser==null){
        new mongo({facebook_id:profile.id,user:profile.displayName}).save().then((newUser)=>{
        //   console.log("before");
          return done(null,newUser)
        })

      }else{
        // console.log("before");
        done(null,currentUser)
      }
    })
    
  }
));