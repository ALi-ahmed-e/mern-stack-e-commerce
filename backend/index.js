const dotenv = require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000
const cors = require('cors');
const session = require('express-session');
const connectToDb = require('./config//connectToDB')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimiting = require('express-rate-limit')
const hpp = require('hpp')
require('./utils/passport')
const passport = require('passport');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/authMiddleware');
// const roleMiddleware = require('./middleware/roleMiddleware');
const path = require("path")
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');
const productRoute = require('./routes/products');


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{secure: true}
}))


app.use(xss())
app.use(rateLimiting({
    windowMs:10*60*1000,
    max:1200,
}))
app.use(helmet())
app.use(hpp())
app.use(passport.initialize())
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser());
app.use(express.json({limit: '100mb'}))
app.use(cors({
    // origin: 'http://localhost:3000',
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}))


app.listen(PORT, () => console.log(`app listening on ${PORT}`));
connectToDb()

app.use('/api/auth', authRoute)
app.use('/api/dashboard', authMiddleware, dashboardRoute)
app.use('/api/product',productRoute)

const _dirname = path.resolve();

app.use(express.static(path.join(_dirname, "../frontend/dist")));

app.get("*", (req, res) =>
  res.sendFile(path.join(_dirname, "../frontend/dist/index.html"))
);

