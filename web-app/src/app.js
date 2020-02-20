const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const redis = require('redis')
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()

const app = express();
const accountRouter = require('./pl/routers/createAccount.router')
const loginRouter = require('./pl/routers/loginAccount.router')
const logoutRouter = require('./pl/routers/logout.router')

app.set('views', path.join(__dirname+"/pl", "views"))

app.use(cookieParser())
app.use(expressSession({
  secret: "ftrhytjjujtfvel345jf",
  saveUninitialized: false,
  resave: false,
  store: new RedisStore({client: redisClient})
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


app.get('/', function (request, res) {
    res.render("start.hbs")
})

app.get('/home', function(request, response){
	response.render("home.hbs")
})

app.get('/toDoList', function(request,res){
  res.render("toDoList.hbs")
})

app.get('/login', function(request,res){
  res.render("login.hbs")
})

app.get('/signup', function(request,res){
  res.render("signup.hbs")
})

app.get('/createPost', function(request, res){
	res.render("createPost.hbs")
})

app.get('/readMore', function(request, res){
	res.render("readMore.hbs")
})

app.post("/signup", function(request, response){

	const email = request.body.email
	const username = request.body.username
	const userPassword = request.body.userPassword
	if(email && userPassword){
		account.createAccount(username, email, userPassword, function(error, account){
			console.log("accountSignIn:", account)
			if(error){
				response.send("<h1>Error with database</h1>")
			}
			else if(account > 0){
				response.redirect("/login")
			}
		})
	}
})

app.post("/login", function(request, response){

  	const username = request.body.username
	const userPassword = request.body.password
	const validationErrors = []
	if (username && userPassword) {
		account.getAccount(username, userPassword, function(error, result){
			console.log("resultlogin", result)
			if(error){
				response.send("<h1>Error with database</h1>")
			}
			else if(result.length > 0){
				request.session.isLoggedIn = true
				request.session.username = username
				response.redirect("/home")
			}else{
				validationErrors.push("Wrong username/password!")
				const model = {
					validationErrors
				}
				response.render("login.hbs", model)
			}
		})
	}	
})

app.listen(8080, () => {
  console.log('Server is up!');
})