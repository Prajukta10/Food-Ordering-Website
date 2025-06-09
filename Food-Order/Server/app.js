const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./Route/index");
const dotenv = require("dotenv");
const passport = require("passport");
const cookieSession = require("cookie-session");

const PORT = 5500;
const HOSTNAME = "localhost";
const paymentRoute = require("./Controller/payment")
const authRoute = require("./Controller/auth");
const passportSetup = require("./Controller/passport");

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

dotenv.config();

// Request Management
const app = express();

app.use(cookieSession({name: "session", keys:["edureka"], maxAge: 24*60*60*1000}))

app.use(express.json());      
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.use('/', route);
app.use('/api/payment/', paymentRoute);
app.use("/auth/", authRoute);
// DB
const MongoAtlas = process.env.MONGODB_URI;
mongoose.connect(MongoAtlas, {
})
    .then(res => {
        app.listen(PORT, HOSTNAME, () => {
            console.log(`Server is running at ${HOSTNAME}: ${PORT}`)
        });
    })
    .catch(err => console.log(err));