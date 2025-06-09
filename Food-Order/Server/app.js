// app.js (or index.js)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
require("./Controller/passport"); // Make sure passport strategies are initialized
const paymentRoute = require("./Controller/payment");
const authRoute = require("./Controller/auth");
const route = require("./Route/index");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

// ✅ Enable CORS for frontend (Netlify)
app.use(cors({
  origin: "https://food-ordering-zone.netlify.app",
  credentials: true,
}));

// ✅ JSON parser
app.use(express.json());

// ✅ Session middleware
app.use(session({
  secret: "YOUR_SESSION_SECRET_HERE", // replace with strong secret or env var
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,        // must be true when using HTTPS (Render uses HTTPS)
    sameSite: "none",    // allows cross-origin cookies
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
}));

// ✅ Passport setup
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/", route);
app.use("/api/payment", paymentRoute);
app.use("/auth", authRoute);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
  });
}).catch(err => console.error(err));





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
