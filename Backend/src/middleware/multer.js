const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req,file,callback){
        callback(null, './src/uploads')
    },
    filename: function (req, file, callback){
        console.log("MULTER HEDA",req.headers.authorization)
        const decodToken = JSON.parse(atob(req.headers.authorization.split('.')[1])).data
        console.log(decodToken);
        const fieldname =("usrimg-" + decodToken.id + '.' + file.mimetype.split('/').at(1));
        console.log(fieldname)
        console.log('file',file)
        callback(null, fieldname)
    }
})

const fileFilter = function (req, file, callback){
    const allowedTypes = ['image/jpeg','image/jpg','image/png','image/gif']

    if (allowedTypes.includes(file.mimetype)){
        callback(null, true)
    }else{
        callback( new Error('no pasa filtro'))
    }

}

const upload = multer({ storage: storage, fileFilter: fileFilter })

module.exports = upload