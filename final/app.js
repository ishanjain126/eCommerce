const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors');    // cors enables your api to handle the requests coming from different origins
// front end running on 3001, backend on 8000 -> connecting them will be cors job
const expressValidator = require('express-validator')
require('dotenv').config()

//import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');

//app
const app = express()

//db
mongoose.connect(process.env.DATABASE,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}) .then(() => console.log('Database Connected')).catch(err => {
    console.log(JSON.stringify(err, Object.getOwnPropertyDescriptor(err)));
});
 

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());


//routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', braintreeRoutes);
app.use('/api/order', orderRoutes);


const port = process.env.PORT || 8000


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
} )
