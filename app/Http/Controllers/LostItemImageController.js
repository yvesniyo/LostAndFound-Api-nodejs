const multer = require('multer');
const path = require('path');
const { imageFilter } = require('../../Helpers/ImageFilter');

class LostItemImageController {

    constructor({ lostItemService, resHelper, locale }) {
        this.lostItemService = lostItemService
        this.resHelper = resHelper
        this.locale = locale
    }

    async uploadImage({ req, res, next }) {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'uploads/');
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
            }
        });
        let upload = multer({ storage: storage, fileFilter: imageFilter }).single('item_image');
        upload(req, res, function (err) {
            if (req.fileValidationError) {
                return this.resHelper({ res, error: req.fileValidationError, status: 400 });
            }
            else if (!req.file) {
                return this.resHelper({ res, error: this.locale.translate("Please select an image to upload"), status: 422 });
            }
            else if (err instanceof multer.MulterError) {
                return this.resHelper({ res, error: err, status: 500 });
            }
            else if (err) {
                return this.resHelper({ res, error: err, status: 500 });
            }
            this.resHelper({ res, data: req.file.filename, message: "Image uploaded successfuly" });
        });
    }
}

module.exports = LostItemImageController