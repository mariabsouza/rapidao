const express = require('express')
const exphbs = require('express-handlebars')
const cookieParser = require("cookie-parser");
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')


const app = express()

const conn = require('./db/conn')

//Models
const Tutorial = require('./models/Tutorial')

//ImportRoutes
const trainingRoutes = require('./routes/trainingRoutes')
const authRoutes = require('./routes/authRoutes')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true
  })
)

//session middleware
const oneDay = 1000 * 60 * 60 * 24;

app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: true,
    store: new FileStore({
      logFn:function() {},
      path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    cookie: {
      secure: false,
      maxAge: oneDay,
      httpOnly: true
    }
  })
  )
  
app.use(cookieParser());
//flash messages
app.use(flash())

app.use(express.json())

//public
app.use(express.static('public'))

//set session to res
app.use((req, res, next) => {
  if(req.session.userId) {
    res.locals.session = req.session
  }

  next()
})

//Routes
app.use('/', trainingRoutes)
app.use('/user', authRoutes)

conn.sync().then(() => {
  //heroku
  app.listen(process.env.PORT || 3000)
  
  //local
  // app.listen(3000)

}).catch((err) => console.log(err))