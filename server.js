const express = require('express');
let app = express();
// const path = require('path')
const fallback = require('express-history-api-fallback');

app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/static'));

var root = __dirname;
app.use(express.static(root));
app.use(fallback('/dist/index.html', { root }));

// app.get( '/*', function(req, res) {
//   res.sendFile(path.join(__dirname, '/dist/index.html'));
// });


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
