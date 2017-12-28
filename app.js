//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load EventListeners
loadEventListeners();

function loadEventListeners(){
    //Load DOM event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    //Clear task event
    clearBtn.addEventListener('click', clearTask);
    // Filter task event 
    filter.addEventListener('keyup', filterTask)
}

//Get tasks form ls
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //Create li element
        const li = document.createElement('li');
        //Add Class
        li.className = 'collection-item';
        //Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element

        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append the link to the li
        li.appendChild(link);
        //Append the li to the ul

        taskList.appendChild(li);
    });
}

//Add task event 
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    } else {
        //Create li element
    const li = document.createElement('li');
    //Add Class
    li.className = 'collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element

    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to the li
    li.appendChild(link);
    //Append the li to the ul

    taskList.appendChild(li);
    
    //Store task
    storeInLS(taskInput.value);
    //Clear input
    taskInput.value = '';
    //console.log(li);
    }
    e.preventDefault();
}

//Store task
function storeInLS(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task 
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            // Remove task from LS
            removeFromLS(e.target.parentElement.parentElement);
        }
    }
}

// Remove task from LS
function removeFromLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear task
function clearTask(){
    //taskList.innerHTML = '';
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // https://jsperf.com/innerhtml-vs-removechild

    // Clear from LS
    clearFromLS();
}

// Clear from LS
function clearFromLS(){
    localStorage.clear();
}
// Filter task
function filterTask(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            }else {
                task.style.display = 'none';
            }
        }
    );
}
