var express = require('express'),
  app = express();

var bodyParser = require('body-parser'),
  multer = require('multer'), // v1.0.5
  upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var Nightmare = require('nightmare'),
  nightmare = Nightmare({ show: true });


app.get('/', function (req, res) {
  res.send('Things are whirring!');
});

app.post('/search', upload.array(), function (req, res, next) {
  // var data = req.body;
  if ('q' in req.body) {
    console.log(req.body);
    res.json(req.body);
  } else {
    res.send('expected a q param')
  }
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
