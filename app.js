/*
***This mini project uses the EXPRESS FRAMEWORK which (based on my research) relies on the http module internally to create and manage the server*****

HTTP MODULES USED:
Node.js HTTP method: GET (in this case the project uses the app.get() to retrieve data from server )
Node.js HTTP method: POST (in this case the project uses the app.post() to send data to the server, which in this proj. is used for creation, editing/update, and deletion of tasks)
Express.js (specific) method: app.listen (used to create a custom HTTP server (this leverages the Node.js http.createServer()))

VIEWS USED:
index.ejs (view tasks)
new.ejs (add new task form)
edit.ejs    (edit/update form)

*tama ba to?
*baka mali?
*/

const express = require('express'); // Import express.js module
const bodyParser = require('body-parser'); //Import body-parse module
const app = express(); //create Express app
const PORT = 8080;

app.set('view engine', 'ejs'); //Set EJS as templating engine
app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser to parse URL-encoded data
app.use(express.static('public'));

let tasks = [];

//Route to redirect the root URL to /tasks
app.get('/', (req, res) => {
    res.redirect('/tasks');
});

//Route to display all tasks (index.ejs)
app.get('/tasks', (req, res) => {res.render('index', {tasks: tasks});});

//Route to display new.ejs (form used for creating new tasks)
app.get('/tasks/new', (req, res) => {res.render('new');});

//Route that handles the creation of a new task
app.post('/tasks', (req, res) => {const newTask = { id: Date.now().toString(), 
    task: req.body.task};
    tasks.push(newTask);
    res.redirect('/tasks');
})

//Route to display edit.ejs (form used for editing/updating existing tasks)
app.get('/tasks/:id/edit', (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    res.render('edit', {task: task});
});

//Route that handles the updates made for an existing task
app.post('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    task.task = req.body.task;
    res.redirect('/tasks');
});

//Route that handles the deletion of a task
app.post('/tasks/:id/delete', (req, res) => {
    tasks = tasks.filter(t => t.id !== req.params.id);
    res.redirect('/tasks');
});

app.listen(PORT, () => {console.log(`Server is running on http://localhost:${PORT}`);});
