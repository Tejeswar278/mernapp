const express = require('express');
const app = express();
const cors = require('cors')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose');
const User = require('./models/user.model');

app.use(cors())

app.use(express.json())

mongoose.connect('mongodb+srv://epj:epj_2708@cluster0.uklfn.mongodb.net/userdata?retryWrites=true&w=majority')

app.post("/register", async (req,res) => {
    try {
        console.log(req.body )
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json({status: 'ok'})
    } catch (error) {
        res.json({status: "error", error: "duplicate email"})
    }
})

app.post("/login", async (req,res) => {
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        })
        if(user){
            const token = jwt.sign({
                name: user.name,
                email: user.email,

            }, 'secret278')
            return res.json({status: 'ok', user: token});
        }else{
            return res.json({status: "error", error: false})
        }
})

app.get("/product", async (req,res) => {
    const token = req.headers['x-access-token'];
    try {
        const decode = jwt.verify(token, 'secret278')
        const email = decode.email;
        const user  = await User.findOne({email: email});
        return res.json({status: 'ok', role: user.role})
    } catch (error) {
        console.log(error);
        res.json({status: 'error', error: 'invalid token'})
    }
    
})

app.post("/product", async (req,res) => {
    const token = req.headers['x-access-token'];
    try {
        const decode = jwt.verify(token, 'secret278')
        const email = decode.email;
        const user  = await User.findOne({email: email},{$set : {role: req.body.role}});
        return {status: 'ok'}
    } catch (error) {
        console.log(error);
        res.json({status: 'error', error: 'invalid token'})
    }
    
})

app.listen(8080, () => {
    console.log('server started')
})