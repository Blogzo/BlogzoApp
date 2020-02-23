const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const redis = require('redis')
const redisClient = redis.createClient({host: 'session-database'})
const redisStore = require('connect-redis')(expressSession)
const awilix = require('awilix')

const app = express()

const accountRouter = require('./pl/routers/accountRouter/createAccount.router')
const loginRouter = require('./pl/routers/accountRouter/loginAccount.router')
const logoutRouter = require('./pl/routers/accountRouter/logout.router')
const blogRouter = require('./pl/routers/blogRouter/blogRouter.router')

app.set('views', path.join(__dirname+"/pl", "views"))

app.use(cookieParser())

redisClient.on("error", function(error){

  console.log("Redis error:", error)
})

redisClient.on("end", function(){

  console.log("Redis connection closed")
})

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
})

app.use(expressSession({
  secret: "ftrhytjjujtfvel345jf",
  saveUninitialized: false,
  resave: false,
  store: new redisStore({ client: redisClient})
}))


app.use(function(request, response, next){
   
    response.locals.isLoggedIn = request.session.isLoggedIn
    next()
})



app.use(bodyParser.urlencoded({
  extended: false
}))



app.engine("hbs", expressHandlebars({
  defaultLayout: "main.hbs",
  extname: 'hbs',
  layoutsDir: path.join(__dirname, '/pl/layouts')
}))

app.use(express.static(__dirname + '/pl/public'))
app.use(express.static(__dirname + '/bll/validation'))
app.use("/create-account", accountRouter)
app.use("/login", loginRouter)
app.use("/logout", logoutRouter)
app.use("/blogposts", blogRouter)


app.get('/', function (request, res) {
    res.render("start.hbs")
})

app.get('/toDoList', function(request,res){
  res.render("toDoList.hbs")
})

app.listen(8080, () => {
  console.log('Server is up!');
})