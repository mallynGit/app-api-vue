
//aqui iria un manejador que devolveria un texto apropiado 
//segun el codigo y que recibiria como parametro un codigo
// de estado, pasado por los controladores 
const AppError = require('../AppError')

const errorHandler = (err, req, res, next) => {

    console.log('------------------------')
    console.log(new Date(Date.now()).toISOString())
    
    if(err instanceof AppError){
        console.log(err)
        console.log('------------------------')
        return res.status(err.statusCode).json({errorCode: err.errorCode, msg: err.message})
    }
    
    if(err.name==='SequelizeDatabaseError'){
        console.log(`${new Date(Date.now()).toISOString()}\n${[err]}`);
        console.log('------------------------')
        return res.status(400).json({msg: 'Malformed request.'})
    }
    
    //console.log(req)
    console.log(err)
    console.log('------------------------')
    return res.status(500).json({error: 'Something went wrong'})
}

module.exports = errorHandler 