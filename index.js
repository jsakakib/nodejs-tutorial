const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const Joi = require('joi');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.use(express.json());
app.use('/api/courses', courses);
app.use('/', home);

// Configuration
debug(`Application Name: ${config.get('name')}`);
debug(`Mail Server: ${config.get('mail.host')}`);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

app.use(logger);
app.use(auth);

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));