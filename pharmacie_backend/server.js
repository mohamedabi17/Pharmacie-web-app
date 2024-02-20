const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

// Enable CORS middleware
app.use(cors()); // Allow any request from any source

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Multer configuration
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 } // Increase the file size limit to 10MB
});

const pharmacieRouter = require('./routes/pharmacieRouter');
app.use('/pharmacie', pharmacieRouter);



app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {

    res.status(400).json({ error: 'File upload error' });
  } else {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});


