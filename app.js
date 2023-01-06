const express = require("express");
const morgan = require("morgan");
const postBank = require('./postBank.js')

const app = express();

const PORT = 1337;

app.get("/", (req, res) => {

  const postList = postBank.list()  ;
  const html = `<!DOCTYPE html>
  <html>
    <head>
      <title>Wizard News</title>
      </head>
      <body>
        <ul>
        ${postList.map(post => `
        <li>${post.title}</li>
        <li>${post.name}</li>
        `)}
          </ul>
          </body>
      </html>`

      res.send(html);

});

app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
