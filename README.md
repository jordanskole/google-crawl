# Google Crawl with [Nightmare.js](http://www.nightmarejs.org/)

The "Google Crawl" micro-service application is a simple API with a single endpoint. Send a `POST` request to `/search` with a `q` parameter, and it will return the `href` of the first organic listing on the page.

> :warning: this app is currently structured to only run locally, due to a timeout issue (I need to move the process from `web` to `worker`). Stay tuned, more soon!

```json
// example request
{
  "q": "game of thrones"
}

// example response
{
  "query": "https://google.com/search?q=game of thrones",
  "result": "http://www.hbo.com/game-of-thrones"
}
```

The app is built on nightmarejs from the team at segment, and nightmare is built on electron, a headless browser that actually renders a page just like a browser would. For more information on nightmarejs check out [their docs](https://github.com/segmentio/nightmare).

## Running the app locally

If you want to contribute to the application, or just to see it run, you will probably want to fire it up locally.

Getting started is easy. Open your favorite terminal utility and navigate to your working directory and clone the repo:

```shell
$ cd ~/Sites
$ git clone https://github.com/jordanskole/google-crawl.git
$ cd google-crawl
```

If it is your first time running the application make sure to install all the `npm` libraries

```shell
$ npm install
```

Then, just fire the application up using `heroku toolbelt` if you don't have `heroku toolbelt` installed, you can grab it from the [heroku website](https://toolbelt.heroku.com/)

```shell
$ heroku local web
```

## Sending a request

Send a simple `POST` request to the local endpoint (`localhost:3000/search`), the body of the request can be `form`, `x-www-form-urlencoded` or a `json` request.

![](/images/postman_screen.png)
