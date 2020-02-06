const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')

const app = express();
const db = require('../src/dal/db')

app.set('views', path.join(__dirname+"/pl", "views"))

const username = "admin"
const password = "abc123"

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


app.get('/', function (request, res) {
    res.render("start.hbs")
})

app.get('/home', function(request,res){
  res.render("home.hbs")
})

app.get('/login', function(request,res){
  res.render("login.hbs")
})

app.get('/signup', function(request,res){
  res.render("signup.hbs")
})

app.post("/login", function(request, response){
  if(request.body.password == password && request.body.username == username){
    response.render("home.hbs")
  }else{
    response.render("unauthorized.hbs")
  }
})

app.listen(8080, () => {
  console.log('Server is up');
})