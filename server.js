const express = require('express');
let app = express();
const path = require('path')

app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/static'));

app.get( '/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 
