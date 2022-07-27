const express = require('express');
const bodyParser= require('body-parser');
const usersTodoRoutes= require('./routes/users-todo');
const usersRoutes = require('./routes/users');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use("/", usersRoutes);

app.use('/',usersTodoRoutes);



app.use((req, res, next)=>{
    const error = new Error("Could not find this Route");
    error.code = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message : error.message || "An Unknown Error Occured"});
});

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qjfxp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
        .then(()=>{
            app.listen(process.env.PORT || 5000);
        })
        .catch(err=>{
            console.log(err);
        });

