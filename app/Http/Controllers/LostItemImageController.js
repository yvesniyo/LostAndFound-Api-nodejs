const multer = require('multer');
const path = require('path');
const { imageFilter } = require('../../Helpers/ImageFilter');

class LostItemImageController {

    constructor({ lostItemService, lostItemImageService, resHelper, locale }) {
        this.lostItemService = lostItemService
        this.lostItemImageService = lostItemImageService
        this.resHelper = resHelper
        this.locale = locale
    }


    async showImage({ req, res, next }) {
        const id = parseInt(req.params.id)
        return this.resHelper({ res, data: (await this.lostItemImageService.find({ id })) })
    }

    async getImages({ req, res, next }) {
        const lost_item_id = parseInt(req.params.id)
        return this.resHelper({ res, data: (await this.lostItemImageService.lostItemImages({ lost_item_id })) })
    }


    async removeImage({ req, res, next }) {
        const lost_item_id = parseInt(req.params.id)
        const lost_item_image_id = parseInt(req.params.lost_item_image_id)
        return this.resHelper({ res, data: (await this.lostItemImageService.removeImage({ lost_item_id, lost_item_image_id })) })
    }

    async uploadImage({ req, res, next }) {
        const lost_item_id = req.params.id
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public/uploads/');
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
            }
        });
        let upload = multer({ storage: storage, fileFilter: imageFilter }).single('item_image');
        upload(req, res, async (err) => {
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
            const fileName = (req.file.destination + req.file.filename).replace("public", "")
            const image = await this.lostItemImageService.addImage({ lost_item_id, url: fileName })
            this.resHelper({ res, data: image, message: "Image uploaded successfuly" });
        });
    }
}

module.exports = LostItemImageController