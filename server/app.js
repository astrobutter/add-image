const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const UserModel = require('./models/User')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

mongoose.connect(
    "mongodb+srv://user001:test12345@cluster0.ulfw0hj.mongodb.net/user-uploads?",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

app.post('/upload', upload.single('file'), (req, res) =>{
    UserModel.create({image: req.file.filename})
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.get('/getImage', (req, res) => {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.listen(3000, () => {
    console.log("Server is running at 3000")
});