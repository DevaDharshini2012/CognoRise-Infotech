const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

let tasks = [];

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
    const task = req.body.task;
    if (task) {
        tasks.push(task);
        res.status(201).json({ message: 'Task added' });
    } else {
        res.status(400).json({ message: 'Task is required' });
    }
});

// Edit a task
app.put('/tasks/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const newTask = req.body.task;
    if (index >= 0 && index < tasks.length && newTask) {
        tasks[index] = newTask;
        res.json({ message: 'Task updated' });
    } else {
        res.status(400).json({ message: 'Invalid index or task' });
    }
});

// Delete a task
app.delete('/tasks/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        res.json({ message: 'Task deleted' });
    } else {
        res.status(400).json({ message: 'Invalid index' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
