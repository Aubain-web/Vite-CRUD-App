const http = require('http');
const app = require('./app');
app.set('port', 3000);
const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
