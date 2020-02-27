
module.exports = function({accountRepository}){

    return {

        getValidationErrors: function(username){
            
            const errors = []

            if(username.length <= 5){
                errors.push("Username to short!")
            }
            if(username.length >= 20){
                errors.push("Username to long!")
            }
            return errors
        },

        getAccountById: function(personId){

            accountRepository.getAccountById(personId, function(errors, account){
                callback(errors, account)
            })
        },

        getAccount: function(username, userPassword, callback){

            accountRepository.getAccount(username, userPassword, function(errors, account){
                callback(errors, account)
            })
        },

        createAccount: function(username, email, userPassword, callback){

            const errors = this.getValidationErrors(username)
            if(errors.length > 0){
                callback(errors)
                return
            }
            accountRepository.createAccount(username, email, userPassword, function(errors, account){
                callback(errors, account)
            })
        }
    }
}

