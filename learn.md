# Node & ExpressJS

```js
    const path = require('path');
    const morgan = require('morgan');
    const { engine } = require('express-handlebars');
    const express = require('express');

    const app = express();
    const port = 3000;

    // Static files
    app.use(express.static(path.join(__dirname, 'public')));

    // HTTP logger
    app.use(morgan('combined'));

    // Template engine (handlebars)
    app.engine('hbs', engine({
        extname: ".hbs"
    }));
    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, 'resources/views'))

    // Route
    app.get('/', (req, res) => {
        res.render('home')
    })

    app.get('/news', (req, res) => {
        res.render('news')
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
```

