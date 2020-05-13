const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const Users = require('./api/routes/users');
const UserModel = require('./models/users');
const Articles = require('./api/routes/articles');

const app = express();
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended:false
    })
)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
});

app.use(bodyParser.json());
const db = require("./config/keys").mongoURL;
mongoose.connect(db)
.then(()=> console.log("Connected to database!!!"))
.catch((err) => console.log(err))

require('./config/passport')(passport)
app.use(passport.initialize());
app.use('/api/users', Users);
app.use('/api', Articles);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Listening on port", port));