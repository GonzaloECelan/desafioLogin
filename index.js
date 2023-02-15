const express = require('express');
const path = require('path')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const viewsRouter = require('./router/views');
const sessionRouter = require('./router/session');
const handlebars = require('express-handlebars');


const PORT = process.env.PORT || 8080;

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname + './public')));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(session({
    name:'my-session',
    secret:'top-secret-51',
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly:true,
        maxAge: 60000 * 60
    },
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://gonzalo:coder@ecommerce.exk6w0e.mongodb.net/storage?retryWrites=true&w=majority",
        ttl: 60 * 60

    })
}))

// Routes
app.use('/',viewsRouter);
app.use('/api/sessions', sessionRouter);





// listen
app.listen(PORT, ()=>{
console.log('servidor corriento en el puerto 8080')
})