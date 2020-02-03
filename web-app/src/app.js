const express = require('express');
const expressHandlebars = require('express-handlebars');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname+"/pl", "views"));

app.engine("hbs", expressHandlebars({
  defaultLayout: "main.hbs",
  extname: 'hbs',
  layoutsDir: path.join(__dirname, '/pl/layouts')
}))

app.use(express.static(__dirname + '/pl/public'))

app.get('/', function (request, res) {
    res.render("home.hbs")
})

app.get('/login', function(request,res){
  res.render("login.hbs")
})

app.listen(8080, () => {
  console.log('Server is up');
})