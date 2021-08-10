const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());

//CORS policy
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

const loginRouter = require('./routes/login');

app.use("/login", loginRouter)

app.use((req, res, next)=>{
    res.status(404).send({err: 'Not found'})
})

app.listen(PORT);