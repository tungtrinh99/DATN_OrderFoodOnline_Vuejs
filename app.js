const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const routers = require('./app/routers/index');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200,
  credentials: true 
}
dotenv.config({
  path: './.env'
});
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors(corsOptions))
routers(app);


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
