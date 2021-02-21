require("../auth_strategies/google");
require("../auth_strategies/facebook");

const express = require("express");
const router = express.Router();
const passport = require("passport");
const cookieSession = require("cookie-session");

router.use(cookieSession({
  maxAge:3*60*1000,
  secret:process.env.secret
}));

router.use(express.json());
router.use(express.urlencoded({extended:false}));
router.use(passport.initialize());
router.use(passport.session());

// authCheck middleware function
function authCheck(req,res,next){
  if(!req.user){
    res.redirect("/")
  }
  next()
}



//google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/redirect',passport.authenticate('google'),
  function(req, res) {
    // console.log(req.user);
    res.redirect("/auth/profile");
  }
);

// facebook
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/redirect',passport.authenticate('facebook'),
function(req,res){
    res.redirect("/auth/profile")
  }
);





router.get("/profile",authCheck,(req,res)=>{
  console.log(req.user);
  res.render("profile",{data:req.user})
})

router.get("/logout",(req,res)=>{
  req.logout();
  res.redirect("/")
})

module.exports = router;