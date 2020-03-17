const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const blogpostHandler = require('../bll/blog-manager')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

const correctUsername = "Admin"
const correctPassword = "abc123"
const serverSecret = "sdfkjdslkfjslkfd"

app.use(function(request, response, next){

    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader("Access-Control-Allow-Methods", "*")
    response.setHeader("Access-Control-Allow-Headers", "*")
    response.setHeader("Access-Control-Expose-Headers", "*")
    next()
})


