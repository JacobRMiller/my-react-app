const express = require('express');

var app = express();

app.get('/', (req,res) => {
    res.send(
        { name : "JAKE" }
    );
});

app.listen(3000);