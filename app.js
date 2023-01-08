const express = require("express");
const morgan = require("morgan");
const postBank = require('./postBank.js')

const app = express();

const PORT = 1337;

app.use(express.static('public'))
app.use(morgan('dev'));

app.get("/", (req, res) => {

  const postList = postBank.list();
  const html =
    `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${postList.map(post => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            <a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
    ).join('')}
    </div>
  </body>
</html>`

  res.send(html);

});

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
  if (!post.id){
    res.send(ErrorHandler)
  }
  const html =
    `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      <div class='news-item'>
      <p>
        <span class="news-position">${post.id}. ▲</span>
        ${post.title}
        <small>(by ${post.name})</small>
      </p>
      <p>${post.content}</p>
      <small class="news-info">
        ${post.upvotes} upvotes | ${post.date}
      </small>
    </div>
    </div >
  </body >
</html > `

res.send(html)
})

const ErrorHandler = ((err, req, res, next) => {
  res.status(404)
  console.error(err.stack)
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Wizard News</header>
      <div class="not-found">
        <p>Accio Page! 🧙‍♀️ ... Page Not Found</p>
        <img src="/dumbledore-404.gif" />
      </div>
    </body>
    </html>`
  res.send(html)
})

app.use(ErrorHandler)


app.listen(PORT, () => {
  console.log(`App listening in port ${ PORT } `);
});
