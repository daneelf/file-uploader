const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const fileRoute = require('./routes/file');
require('./db/db');

app.use(cors());
app.use(fileRoute);

app.listen(8000, function() {
    console.log('All is good!!! App running on port 8000');
});

app.use(express.static(path.resolve('./public')));
