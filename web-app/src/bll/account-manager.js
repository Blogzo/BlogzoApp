const accountRepo = require('../dal/account-repository')
const express = require('express')
const app = express()

exports.getAllAccounts = function(callback){

    accountRepo.getAllAccounts(function(errors, accounts){
        callback(errors, accounts)
    })
}

exports.getAccountById = function(id){
   
    if(isLoggedIn){
        return accountRepo.getAccountById(id)
    }else{
        throw "Unauthorized!"
    } 
}

exports.getAccount = function(account){

    if(isLoggedIn){

    }else{
        Response.send("<h1>Unauthorized</h1>")
    }
}


exports.createAccount = function(callback){

    accountRepo.createAccount(function(errors, account){
        callback(errors, account)
    })
}