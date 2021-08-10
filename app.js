const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 4000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());

//CORS policy
app.use(
    cors({
        origin: true,
        credentials: true
    })
);

const loginRouter = require('./routes/login');

app.use("/login", loginRouter)

app.use((req, res, next)=>{
    res.status(404).send({err: 'Not found'})
})

app.listen(PORT);