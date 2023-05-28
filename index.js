const express = require('express');
const app = express();
const routes = require('./routes/index')
const error404 = require('./middleware/404')


app.use(express.json())
app.use('/api', routes)
app.use(error404)

app.listen(5000);

