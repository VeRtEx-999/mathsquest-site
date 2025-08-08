const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

// In-memory user store (for demo only)
const users = [];
const progress = {};

app.use(cors());
app.use(bodyParser.json());

// Register endpoint
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    users.push({ username, password });
    progress[username] = {};
    res.json({ message: 'Registration successful' });
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful' });
});

// Save progress endpoint
app.post('/api/progress', (req, res) => {
    const { username, data } = req.body;
    progress[username] = data;
    res.json({ message: 'Progress saved' });
});

// Load progress endpoint
app.get('/api/progress/:username', (req, res) => {
    const username = req.params.username;
    res.json({ data: progress[username] || {} });
});
app.use(express.static('auth-web-app/public'));
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});