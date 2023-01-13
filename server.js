const express = require('express');
let app = express();
const path = require('path')

app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/src/assets'));

app.get(['/login', '/registration','/profile'], function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 