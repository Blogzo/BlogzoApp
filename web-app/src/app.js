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

const blogRepository = require('./dal/blog-repository')
const blogManager = require('./bll/blog-manager')
const blogRouter = require('./pl/routers/blogRouter/blogRouter.router')

const toDoRepository = require('./dal/toDo-repository')
const toDoManager = require('./bll/toDo-manager')
const toDoRouter = require('./pl/routers/toDoRouter/toDo.router')

const accountRepository = require('./dal/account-repository')
const accountManager = require('./bll/account-manager')
const createAccountRouter = require('./pl/routers/accountRouter/createAccount.router')
const loginRouter = require('./pl/routers/accountRouter/loginAccount.router')
const logoutRouter = require('./pl/routers/accountRouter/logout.router')

const container = awilix.createContainer()

container.register('blogRepository', awilix.asFunction(blogRepository))
container.register('blogManager', awilix.asFunction(blogManager))
container.register('blogRouter', awilix.asFunction(blogRouter))

container.register('toDoRepository', awilix.asFunction(toDoRepository))
container.register('toDoManager', awilix.asFunction(toDoManager))
container.register('toDoRouter', awilix.asFunction(toDoRouter))

container.register('accountRepository', awilix.asFunction(accountRepository))
container.register('accountManager', awilix.asFunction(accountManager))
container.register('createAccountRouter', awilix.asFunction(createAccountRouter))
container.register('loginRouter', awilix.asFunction(loginRouter))

const theBlogRouter = container.resolve('blogRouter')
const theToDoRouter = container.resolve('toDoRouter')
const theCreateAccountRouter = container.resolve('createAccountRouter')
const theLoginRouter = container.resolve('loginRouter')

app.set('views', path.join(__dirname+"/pl", "views"))

app.use(cookieParser())

redisClient.on("error", function(error){

  console.log("Redis error:", error)
})

redisClient.on("end", function(){

  console.log("Redis connection closed")
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
app.use("/create-account", theCreateAccountRouter)
app.use("/login", theLoginRouter)
app.use("/logout", logoutRouter)
app.use("/blogposts", theBlogRouter)
app.use("/toDoLists", theToDoRouter)

app.get('/', function (request, response) {
    response.render("start.hbs")
})

app.get('/create-toDoList', function(request,response){
  response.render("create-toDoList.hbs")
})

app.listen(8080, () => {
  console.log('Server is up!');
})