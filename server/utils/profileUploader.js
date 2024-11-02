import multer from 'multer'
import path from 'path'
import fs from 'fs'

import getDirName from './getDirName.js'

const _dirname = getDirName(import.meta.url)

const ensureUploadsDirectory = () => {
    const uploadsDir = path.join(_dirname, '../images/profiles')
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir)
    }
}

ensureUploadsDirectory()

const storage = multer.diskStorage({
    destination: (req, file, done) => {
        done(null, path.join(_dirname,'../images/profiles'))
    },
    filename: (req, file, done) => {
        if (file) {
            console.log(file)
            const prefix = Date.now() + '-' + Math.round(Math.random() * 1e9)
            const fileTypes = /jpeg|jpg|png/
            const extname = fileTypes.test(
                path.extname(file.originalname).toLowerCase()
            )
            const mimeType = fileTypes.test(file.mimetype)

            if (extname && mimeType) {
                done(null, file.fieldname + "-" + prefix + path.extname(file.originalname))
            } else {
                const error = new Error("File type not supported")
                error.status = 400
                done(error, false)
            }
        } else {
            done(null, null)
        }
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1000 * 1000,
    },
}).single('profile')

export default upload