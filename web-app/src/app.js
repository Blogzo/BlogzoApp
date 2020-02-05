const express = require('express');
const expressHandlebars = require('express-handlebars');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname+"/pl", "views"));


const username = "admin"
const adminPassword = "abc123"

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

app.get('/login', function(request,res){
  res.render("login.hbs")
})

app.get('/signup', function(request,res){
  res.render("signup.hbs")
})

app.post("/login", function(request,res){
  if(request.body.password == adminPassword && request.body.username == username){
    res.render("home.hbs")
  }else{
    res.render("signup.hbs")
  }
})

app.listen(8080, () => {
  console.log('Server is up');
})