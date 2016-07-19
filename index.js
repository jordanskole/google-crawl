var express = require('express'),
  app = express();

var bodyParser = require('body-parser');
var multer = require('multer'), // v1.0.5
  upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var Nightmare = require('nightmare');

// build a root route, so that we know stuff is working
app.get('/', function (req, res) {
  // and let anyone know everything is a-okay
  res.send('Things are whirring!');
});

app.post('/search', upload.array(), function (req, res) {
  // check and make sure that we have received a query to search for
  if ('q' in req.body) {
    // looks like we received a query in the post request.
    // lets build our google search query
    var query = 'https://google.com/search?q=' + req.body.q

    // create a new nightmare
    nightmare = Nightmare();
    // and fire up nightmare
    nightmare
      // .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
      // go to the google serp page we created earlier
      .goto(query)
      .wait('div.rc > h3.r > a') // for now, keep it simple
      .evaluate(function () {
        // and only grab the href from the first result
        // TODO: build this out to include more information from the result
        return document.querySelector('h3.r > a').getAttribute('href');
      })
      .end()
      .then(function (searchResult) {

        var data = {
          query: query,
          result: searchResult
        }
        res.status(200).json(data);
        return;
      })
      .catch(function (error) {
        console.error('Search failed:', error);
      });
  } else {
    res.send('expected a q param')
  }
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
