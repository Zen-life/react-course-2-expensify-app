const path = require('path'); // path is built-in so no install required
const express = require('express');
const app = express(); // new app - no need to parse anything
const publicPath = path.join(__dirname, '..', 'public') 
// __dirname is current directory, next '..' going up a folder
//  from the server, then go into the public folder
const port = process.env.PORT || 3000; // if PORT (auto set by heroku) exists use, else use static port 3000

app.use(express.static(publicPath)); 
// output notices returned from express.static using app.use, 
//then parse in the public path

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html')); // enable index.html to be diplayed
});

app.listen(port, () => {
    console.log('The server is up!');
}); 
// startup the server and listen to a port. 
// port 3000 is often good for dev. it doesn't throwing errors
// 2nd arg is a callback function which runs when the server is up.