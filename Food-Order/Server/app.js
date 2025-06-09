const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./Route/index");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const paymentRoute = require("./Controller/payment");
const authRoute = require("./Controller/auth");
const passportSetup = require("./Controller/passport"); // must be imported to trigger strategy setup

dotenv.config();

const app = express();

// ✅ Correct CORS setup (allow frontend domain)
const corsOptions = {
  origin: "https://food-ordering-zone.netlify.app", 
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Parse JSON requests
app.use(express.json());

// ✅ Secure cookie + session config for cross-origin OAuth
app.use(
  session({
    secret: "K39*Rp2L@9zWq#tD0m", // ✅ Use a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "none", // ✅ Needed for cross-origin cookies (Netlify ↔️ Render)
      secure: true,     // ✅ Must be true for HTTPS (Render uses HTTPS)
    },
  })
);

// ✅ Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/", route);
app.use("/api/payment", paymentRoute);
app.use("/auth", authRoute);

// ✅ MongoDB connection + server start
const MongoAtlas = process.env.MONGODB_URI;
const PORT = 5500;

mongoose
  .connect(MongoAtlas)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));





// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const route = require("./Route/index");
// const dotenv = require("dotenv");
// const passport = require("passport");
// const cookieSession = require("cookie-session");

// const PORT = process.env.PORT || 5500;
// const HOSTNAME = "0.0.0.0";
// const paymentRoute = require("./Controller/payment")
// const authRoute = require("./Controller/auth");
// const passportSetup = require("./Controller/passport");

// const corsOptions = {
//     origin: "https://food-ordering-zone.netlify.app",
//     credentials: true,
//     optionSuccessStatus: 200
// }

// dotenv.config();

// // Request Management
// const app = express();

// app.use(cookieSession({name: "session", keys:["edureka"], maxAge: 24*60*60*1000}))

// app.use(express.json());      
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(cors(corsOptions));
// app.use('/', route);
// app.use('/api/payment/', paymentRoute);
// app.use("/auth/", authRoute);
// // DB
// const MongoAtlas = process.env.MONGODB_URI;
// mongoose.connect(MongoAtlas, {
// })
//     .then(res => {
//         app.listen(PORT, HOSTNAME, () => {
//             console.log(`Server is running at ${HOSTNAME}: ${PORT}`)
//         });
//     })
//     .catch(err => console.log(err));
