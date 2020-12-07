const auth = require('./src/auth');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const upCloud = require('./src/uploadCloudinary.js');
const mongoose = require('mongoose');
const userSchema = require('./src/userSchema');
const profile = require('./src/profile');
const articles = require('./src/articles');
const User = mongoose.model('user', userSchema, 'users');
const connectionString = 'mongodb+srv://wei:Abcd%401234@cluster0.uucbc.mongodb.net/All_USER?retryWrites=true&w=majority';
const cors = require('cors');
const hello = (req, res) => res.send({ hello: 'world' });
//const corsOptions = {origin: 'http://localhost:3000', credentials: true};
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
const enableCORS = (req, res, next) => {
    res.header('Access-Control-Allow-Origin',req.headers.origin)
    res.header('Access-Control-Allow-Credentials',true)
    res.header('Access-Control-Allow-Headers','Authorization, Content-Type, Origin, X-Requested-With, Accept, X-Session-Id')
    res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE')
    res.header('Access-Control-Expose-Headers', 'Location, X-Session-Id')
    if(req.method == 'OPTIONS'){
        res.status(200).send('OK')
    } else {
        next()
    }
}
app.use(enableCORS);
//app.use(cors(corsOptions));
// upCloud.setup(app);
app.get('/', hello);
auth(app);
profile(app);
articles(app);
// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
     const addr = server.address();
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
});
