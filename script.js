// Run the script after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Load tasks without saving again
    }

    // Function to save tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            tasks.push(li.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        if (!taskText.trim()) {
            alert("Please enter a task!"); // Alert if empty input
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Add event listener to remove task when button is clicked
        removeBtn.addEventListener('click', function () {
            li.remove();
            saveTasks(); // Update Local Storage after removal
        });

        // Append remove button to task item, then add task to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save task to Local Storage if it's a new entry
        if (save) {
            saveTasks();
        }

        // Clear input field after adding task
        taskInput.value = "";
    }

    // Add event listener for button click
    addButton.addEventListener('click', () => addTask(taskInput.value));

    // Add event listener for 'Enter' keypress
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // Load tasks when the page loads
    loadTasks();
});