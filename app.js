const express = require('express');
const app = express();
const PORT = 4000;

const loginRouter = require('./routes/login');

app.use("/login", loginRouter)

app.use((req, res, next)=>{
    res.status(404).send({err: 'Not found'})
})

app.listen(PORT);