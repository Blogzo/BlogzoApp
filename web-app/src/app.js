const express = require('express');
const expressHandlebars = require('express-handlebars');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname+"/pl", "views"));
app.engine("hbs", expressHandlebars({
  defaultLayout: "main.hbs"
}))

app.use(express.static('public'));

app.get('/', function (request, res) {
    res.render("home.hbs")
})


app.listen(8080, () => {
  console.log('Server is up');
})