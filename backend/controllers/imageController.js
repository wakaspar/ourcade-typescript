// Dependency list:
const express = require('express'),
    router = express.Router(),
    path = require('path'),
    fs = require('fs'),
    multer = require('multer');

// Config multer:
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb (null, 'uploads')
    },
    filename: function (req, res, cb) {
        cb (null, 'img_' + Date.now())
    }
});
const uploads = multer({ storage });

// GET iamges route:
router.get('/', (req, res) => {
    // set uploadsDirectory to proper path [dir 'uploads' in root]:
    const uploadsDirectory = path.join('uploads');
    // read files in the directory:
    fs.readdir(uploadsDirectory, (err, files) => {
        if (err) {
            return res.json( { msg: err } );
        }
        // if there are no files in the directory, return msg:
        if (files.length === 0) {
            return res.json( { msg: 'No images in uploads.' } );
        }
        // return an array of all filenames in the uploads directory:
        return res.json({ files })
    });
});

// POST iamges route:
router.post('/', uploads.single('image'), async(req, res) => {
    console.log('POST req.file: ', req.file);
    const image = req.file.path;
    res.json({ msg: `image ${image} successfully created!` });
});

module.exports = router;