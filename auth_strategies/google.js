const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

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


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/redirect"
  },
  function(accessToken, refreshToken, profile, done) {
    mongo.findOne({google_id:profile.id}).then(currentUser=>{
      // console.log(data);
      if(currentUser==null){
        new mongo({google_id:profile.id,user:profile.displayName}).save().then((newUser)=>{
          console.log("before");
          return done(null,newUser)
        })

      }else{
        console.log("before");
        done(null,currentUser)
      }
    })
    
  }
));