import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/temp');
    },

    fileName: (req, file, cb) => {
        cb(null, file.originalName);
    }
});

const upload = multer({storage: storage});

export default upload;