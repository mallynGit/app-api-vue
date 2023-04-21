

class AppError extends Error{
    /**
     * 
     * @param {*} errorCode para dev, identifica tipo error
     * @param {*} message para dev, describe error
     * @param {*} statusCode para navegador, cod estado
     */
    constructor(errorCode, statusCode, message){
        message = super(message) || 'error'
        this.errorCode = errorCode
        this.statusCode = statusCode
    }
}
module.exports = AppError