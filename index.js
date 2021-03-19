require('dotenv').config();
var express = require('express');
var buddasay = require('./lib/buddasay.js')

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname+'/public'));

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.render('home', { buddasay: buddasay.getBuddaSay});
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.use( (req,res) => {
    res.status(404);
    res.render('404');
});

app.use( (err, req, res, next) => {
    console.log(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log('Express запущен по адресу http://localhost:' + app.get('port'));
});


