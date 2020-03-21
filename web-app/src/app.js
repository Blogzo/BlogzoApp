const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const redis = require('redis')
const csrf = require('csurf')
const awilix = require('awilix')  
//const cors = require('cors')

const redisClient = redis.createClient({host: 'session-database'})
const redisStore = require('connect-redis')(expressSession)

const app = express()

const blogRepository = require('./dal-sequelize/blog-repository')
const blogManager = require('./bll/blog-manager')
const blogRouter = require('./pl/routers/blogRouter/blogRouter.router')

const toDoRepository = require('./dal-sequelize/todo-repository')
const toDoManager = require('./bll/toDo-manager')
const toDoRouter = require('./pl/routers/toDoRouter/toDo.router')

const accountRepository = require('./dal-sequelize/account-repository')
const accountManager = require('./bll/account-manager')
const createAccountRouter = require('./pl/routers/accountRouter/createAccount.router')
const loginRouter = require('./pl/routers/accountRouter/loginAccount.router')
const logoutRouter = require('./pl/routers/accountRouter/logout.router')
const restAPI = require('./pl-rest-api/rest-api')

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
container.register('restAPI', awilix.asFunction(restAPI))

const theBlogRouter = container.resolve('blogRouter')
const theToDoRouter = container.resolve('toDoRouter')
const theCreateAccountRouter = container.resolve('createAccountRouter')
const theLoginRouter = container.resolve('loginRouter')
const theRestAPI = container.resolve('restAPI')

const multer = require('multer')

var storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, __dirname + '/uploaded-img/blogpost-img')
  },
  filename: function(request, file, cb) {
    const fileName = file.originalname.toLowerCase().split(' ').join('-')
    cb(null, fileName)
  }
})

app.set('views', path.join(__dirname+"/pl", "views"))

redisClient.on("error", function(error){

  console.log("Redis error:", error)
})

redisClient.on("end", function(){

  console.log("Redis connection closed")
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(cookieParser())
app.use(expressSession({
  secret: "ftrhytjjujtfvel345jf",
  saveUninitialized: false,
  resave: false,
  store: new redisStore({ client: redisClient})
}))
//app.use(cors())

app.use(function(request, response, next){

  response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
  response.setHeader("Access-Control-Allow-Credentials", true)
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  response.setHeader("Access-Control-Allow-Headers", "*")
  response.setHeader("Access-Control-Expose-Headers", "*")
  next()
})

const maxSize = 700 * 500
app.use(multer({ storage: storage, limits: { fileSize: maxSize } }).single('imageFile'))
app.use(csrf({ cookie: true}))
app.use(function(request, response, next){
  var token = request.csrfToken()
  response.locals.isLoggedIn = request.session.isLoggedIn
  response.locals.csrfToken = token
  next()
}) 

app.use(function(error, request, response, next){
  
  if(error !== 'EBADCSRFTOKEN') return next(error)
    response.send(403)
    response.send('Form tampered with!')
})

app.engine("hbs", expressHandlebars({
  defaultLayout: "main.hbs",
  extname: 'hbs',
  layoutsDir: path.join(__dirname, '/pl/layouts')
}))

app.use(express.static(__dirname + '/pl/public'))
app.use(express.static(__dirname + '/uploaded-img'))
app.use("/create-account", theCreateAccountRouter)
app.use("/login", theLoginRouter)
app.use("/logout", logoutRouter)
app.use("/blogposts", theBlogRouter)
app.use("/toDoLists", theToDoRouter)
app.use("/restAPI", theRestAPI)

app.get('/', function (request, response) {
    response.render("start.hbs")
})

app.listen(8080, () => {
  console.log('Server is up!');
})