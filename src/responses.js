// Import the file system library
const fs = require('fs');

/* Read the client and client2 html files into memory so that we can
send them back to the user quickly at runtime. Remember that
fs.readFileSync needs an absolute path. Giving an absolute path would
mean we couldn't move our code to new computers, and so it would break
when we pushed it to heroku, etc.

Node exposes __dirname, a variable that gives us the file path to our
current folder. From there, we can use a relative path to the resource
and at runtime still have an absolute path.
*/
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const client2 = fs.readFileSync(`${__dirname}/../client/client2.html`);

/* Oftentimes, a lot of our endpoints do almost the same thing. For example,
the code for sending an html page is the exact same except for the file that
we want to send. We can factor that code out into a function to cut down
on the code we have to write in the future.
*/
const sendPage = (request, response, page) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(page);
  response.end();
};

/* Get index and getClient2 are handler functions for sending
back our html pages. Since both of them would contain almost
the same code, we can utilize our sendPage function to avoid
writing so much code. We simply pass our request and response
objects downward, as well as provide the function with the
file we want to send the user.
*/
const getIndex = (request, response) => {
  sendPage(request, response, index);
};

const getClient2 = (request, response) => {
  sendPage(request, response, client2);
};

/* We don't only need to send html with our server. This getMessage
function sends back plain text instead of html. In the future, we
will see that we can send back any type of resource we want including
javascript, css, images, videos, etc.
*/
const getMessage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write('Hello world');
  response.end();
};

/* Remember that for our "const responses = require('./responses.js');"
code to work in server.js, we need to export the content from this file.
Without module.exports, each file's content is entirely private to that
file.
*/
module.exports = {
  getIndex,
  getClient2,
  getMessage,
};
