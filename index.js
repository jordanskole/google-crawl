var express = require('express'),
  app = express();

var bodyParser = require('body-parser');
var multer = require('multer'), // v1.0.5
  upload = multer(); // for parsing multipart/form-data

var Nightmare = require('nightmare');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// TODO: build our nightmare functions in order to DRY up the code

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
    console.log('fire up nightmare');
    // create a new nightmare
    nightmare = Nightmare();
    // and fire up nightmare
    nightmare
      // .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
      // go to the google serp page we created earlier
      .goto(query)
      .wait('div.rc > h3.r > a') // for now, keep it simple
      .evaluate(function () {
        console.log('Evaluating the page');
        // and only grab the href from the first result
        // TODO: build this out to include more information from the result
        return document.querySelector('h3.r > a').getAttribute('href');
      })
      .end()
      .then(function (searchResult) {
        console.log('Sending the response');
        var data = {
          query: query,
          result: searchResult
        }

        // if ('webhook' in req.body) {
        //   // TODO: fire the webhook here
        // }

        res.json(data);
        return;
      })
      .catch(function (error) {
        console.error('Search failed:', error);
      });
  } else {
    res.send('expected a q param')
  }
})

// TODO: build a GET route in addition to our POST route

// we need to use the process.env.PORT variable if we are going to deploy to heroku
// normally this would just look like
// app.listen(3000, function () {});
app.listen(process.env.PORT, function () {
  console.log('Example app listening on port ' + process.env.PORT + '!');
});
