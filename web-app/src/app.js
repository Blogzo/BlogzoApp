const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')

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

app.listen(8080, () => {
  console.log('Server is up!');
})