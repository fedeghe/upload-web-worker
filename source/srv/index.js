const express = require('express');
const fileUpload = require('express-fileupload');
const slowDown = require("express-slow-down");
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const _ = require('lodash');

const app = express();
const speedLimiter = slowDown({
    delayMs: 1000
  });

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));
app.use(speedLimiter);

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

//start app 
const port = process.env.PORT || 3000;

app.put('/upload', async (req, res) => {
    const fileName = req.query.fileName
    req.pipe(fs.createWriteStream(`uploads/${fileName}`)).on('finish', () => res.sendStatus(200))
    /*
    try {
        if(!req.files) {
            console.log('No file uploaded')
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let data = []; 
            console.log(req.files)
    
            //loop all files
            _.forEach(_.keysIn(req.files.photos), (key) => {
                let photo = req.files.photos[key];
                
                //move photo to uploads directory
                photo.mv('./uploads/' + photo.name);

                //push file details
                data.push({
                    name: photo.name,
                    mimetype: photo.mimetype,
                    size: photo.size
                });
            });
    
            //return response
            res.send({
                status: true,
                message: 'Files are uploaded',
                data: data
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
    */
});

app.post('/upload', async (req, res) => {
    try {
        if(!req.files) {
            console.log('No file uploaded')
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let data = []; 
            console.log(req.files)
    
            //loop all files
            Object.values(req.files).forEach(file => {
                
                //move photo to uploads directory
                file.mv('./uploads/' + file.name);

                //push file details
                data.push({
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size
                });
            })
    
            //return response
            res.send({
                status: true,
                message: 'Files are uploaded',
                data: data
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


app.listen(port, () =>
    console.log(`App is listening on port ${port}.`)
);

