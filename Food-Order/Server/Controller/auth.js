// const router = require("express").Router();
// const passport = require("passport");

// const CLIENT_URL = "https://food-ordering-zone.netlify.app";


// router.get("/login/success", (req, res) => {
//     if (req.user){
//         res.status(200).json({
//             success: true,
//             message: "Successful",
//             user: req.user
//         });
//     }
// });

// router.get("/login/failure", (req, res) => {
//     res.status(401).json({
//             success: false,
//             message: "Failed"
//     });
// });

// router.get("/logout", (req, res) => {
//     req.logout();
//     res.redirect("https://food-ordering-zone.netlify.app");
// });

// router.get("/google", 
//     passport.authenticate('google', {
//         scope: [ 'profile' ]
// }));

// router.get("/google/callback", 
//     passport.authenticate('google', {
//         successRedirect: CLIENT_URL,
//         failureRedirect: '/login/failure'
// }));

// module.exports = router;

















const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "https://food-ordering-zone.netlify.app";

// Success route
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: req.user,
    });
  } else {
    res.status(403).json({
      success: false,
      message: "Not authenticated",
    });
  }
});

// Failure route
router.get("/login/failure", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Login failed",
  });
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout error" });
    }
    res.redirect(CLIENT_URL);
  });
});

// Google OAuth request
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account", // Optional: forces account selector each time
  })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/auth/login/failure",
  })
);

module.exports = router;

