// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/resumes', require('./routes/resumeRoutes'));
app.use('/api/templates', require('./routes/templateRoutes'));

const PORT = process.env.PORT || 5000;
mongoose.connect('mongodb://localhost:27017/latex-resume-builder', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));

// backend/server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

console.log('WebSocket server started on port 8080');
