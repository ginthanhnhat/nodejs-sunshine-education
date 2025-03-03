const path = require('path');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const express = require('express');
const methodOverride = require('method-override')

const db = require('./config/db')

const Handlebars = require("handlebars");
Handlebars.registerHelper("sum", function (a, b) {
  return a + b;
});


// Connect to DB
db.connect()

const app = express();
const port = 3000;

const route = require('./routes');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware để xử lý dữ liệu form
app.use(express.urlencoded({ extended: true }));

// Middleware để xử lý JSON (không cần thiết cho form HTML nhưng tốt nếu dùng API)
app.use(express.json());

// HTTP logger
// app.use(morgan("combined"));

// Template engine (handlebars)
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    }),
);

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname,'resources', 'views'));

app.use(methodOverride('_method'))

// Route

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
