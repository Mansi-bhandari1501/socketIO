import multer from "multer";

 const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
           return cb(null, ("uploads"))
        },
        filename: (req, file, cb) => {
           return cb(null, `${Date.now()}_${file.originalname}`)
        }
 
    })
}).fields([
   {name: 'image', maxCount: 1}
]);

export default upload;