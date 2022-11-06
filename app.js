const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const errorhandler = require('./middlewares/Errorhandlers')
const blog = require('./routes/blog')
const user = require('./routes/user')

const PORT = process.env.PORT;
const app = express();

require('./middlewares/database').connectToMongoDB() // Connect to MongoDB

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/blog', blog)
app.use('/user', user)




app.get('/', (req, res) => {
    res.send('Welcome to the blog API')
});

app.use(errorhandler)

app.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`)
});