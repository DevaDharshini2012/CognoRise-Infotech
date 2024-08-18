document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    const apiUrl = 'http://localhost:3000/tasks';

    const renderTasks = async () => {
        try {
            const response = await fetch(apiUrl);
            const tasks = await response.json();
            taskList.innerHTML = '';
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${task}</span>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                `;
                taskList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addTask = async () => {
        const task = taskInput.value.trim();
        if (task) {
            try {
                await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ task })
                });
                taskInput.value = '';
                renderTasks();
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
    };

    const editTask = async (index) => {
        const newTask = prompt('Edit your task', '');
        if (newTask !== null && newTask.trim()) {
            try {
                await fetch(`${apiUrl}/${index}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ task: newTask.trim() })
                });
                renderTasks();
            } catch (error) {
                console.error('Error editing task:', error);
            }
        }
    };

    const deleteTask = async (index) => {
        try {
            await fetch(`${apiUrl}/${index}`, {
                method: 'DELETE'
            });
            renderTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    window.editTask = editTask;
    window.deleteTask = deleteTask;

    renderTasks();
});
