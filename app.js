 /* const express = require('express');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const io = /* socket(server); *///require('./utils/socket')(io);

/* var port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
});
 */
/* app.post('/room', (req, res) => {
    roomname = req.body.roomname;
    username = req.body.username;
    res.redirect(`/room?username=${username}&roomname=${roomname}`)
}); */

//Rooms
/* app.get('/room', (req, res)=>{
    res.render('room')
}); 
 */








//Start Server
/* const server = app.listen(port, () => {
    console.log(`Server Running on port ${port}`)
});  */










/* const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require("mongoose");
const path = require("path");

var dbUrl = 'mongodb://username:pass@ds257981.mlab.com:57981/simple-chat';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('mongodb connected');
  })
  .catch((err) => {
    console.log('mongodb connection error', err);
  });

var Message = mongoose.model("message", { name: String, message: String });

var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname, ""));

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/messages', (req, res) => {
  Message.find({}, (err, messages) => {
    if (err) {
      console.log('Error fetching messages:', err);
      res.sendStatus(500);
    } else {
      res.send(messages);
    }
  });
});

app.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) => {
    if (err) {
      console.log('Error saving message:', err);
      res.sendStatus(500);
    } else {
      // Emit a new message event to all connected clients
      io.emit('newMessage', req.body);
      res.sendStatus(200);
    }
  });
});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
}); */










/* const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');

var dbUrl = 'mongodb://username:pass@ds257981.mlab.com:57981/simple-chat';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('mongodb connected');
  })
  .catch((err) => {
    console.log('mongodb connection error', err);
  });

var Message = mongoose.model("message", { name: String, message: String });

var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname, ""));

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/messages', (req, res) => {
  Message.find({}, (err, messages) => {
    if (err) {
      console.log('Error fetching messages:', err);
      res.sendStatus(500);
    } else {
      res.send(messages);
    }
  });
});

app.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) => {
    if (err) {
      console.log('Error saving message:', err);
      res.sendStatus(500);
    } else {
      // Emit a new message event to all connected clients
      io.emit('newMessage', req.body);
      res.sendStatus(200);
    }
  });
});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
}); */








const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
// emit and on
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Socket setup
io.on('connection', (socket) => {
    console.log('a user connected');

    // Listen for chat message
    socket.on('chat message', (message) => {
        io.emit('chat message', message); // Emit the message to all connected clients
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// to set the template engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/room', (req, res) => {
    const roomname = req.body.roomname;
    const username = req.body.username;
    res.redirect(`/room?username=${username}&roomname=${roomname}`);
});

app.get('/room', (req, res) => {
    const { username, roomname } = req.query;
    res.render('room', { username, roomname });
});

// ... (Previous Code)

io.on('connection', (socket) => {
    console.log('a user connected');

    // Store user information in the socket object
    socket.on('joinRoom', ({ username, roomname }) => {
        socket.join(roomname);
        socket.username = username;
        socket.roomname = roomname;
    });

    // Listen for chat message
    socket.on('chat message', (message) => {
        io.to(socket.roomname).emit('chat message', { username: socket.username, message });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});




server.listen(5000, () => {
    console.log('Server is running on port 5000');
});

