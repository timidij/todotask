// tasks.html
const addTaskBtn = document.getElementById('addTaskBtn');
const taskManager = document.getElementById('taskManager');
const taskList = document.getElementById('taskList');

const API_URL = 'http://localhost:3000/api/v1';

// Retrieve user details from localStorage
const userDetails = JSON.parse(localStorage.getItem('userDetails'));
if (userDetails) {
    console.log('User  Details:', userDetails); // You can use userDetails as needed
    // For example, display the user's name on the page
    // document.getElementById('welcomeMessage').textContent = `Welcome, ${userDetails.username}!`;
} else {
    // Handle case where user details are not available (e.g., redirect to login)
    window.location.href = 'index.html';
}

// Add task functionality

addTaskBtn.addEventListener('click', async () => {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const deadline = document.getElementById('taskDeadline').value;
    const priority = document.getElementById('taskPriority').value;

   

    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
         // Include the token
        },
        body: JSON.stringify({title, description, deadline, priority }),
    });

    

    if (response.ok) {
        loadTasks(); // Reload tasks after adding
    } else {
        alert('Failed to add task');
    }
});

// Load tasks function

async function loadTasks() {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/alltask`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token
        },
    });

    const tasks = await response.json();
    taskList.innerHTML = '';
    tasks.forEach(task => {

        const li = document.createElement('li');
   
        taskList.appendChild(li)
        
        // li.textContent = `${task.title} - ${task.description} (Due: ${task.deadline}) `;
        li.innerHTML =`<li class="" data-id= ${task._id}><span class="text">${task.title} </span> <span class="texts"> ${task.description}</span><button>update</button><span class="close">×</span></li>`
        taskList.appendChild(li);
    });
}
// Load tasks on page load
loadTasks()

// taskList.addEventListener('click', function(e){
//     if(e.target.tagName === "LI"){
//         e.target.classList.toggle("checked")
//         // saveData()
//     }else if (e.target.tagName === "SPAN"){
//         e.target.parentElement.remove()
//         // saveData()
//     }else if (e.target.tagName === "BUTTON"){
//         console.log(e.target.parentElement.textContent)
//         modal.style.display = "revert"
//         // modal.innerHTML = e.target.parentElement.textContent
//     }

// }, false);



taskList.addEventListener('click', function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        // saveData()
    } else if (e.target.tagName === "SPAN") {
        const itemId = e.target.parentElement.getAttribute('data-id'); // Assuming you store the ID in a data attribute
        e.target.parentElement.remove();
        // await fetch(`${API_URL}/tasks`
        // Send DELETE request to the server
        fetch(`${API_URL}/${itemId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message); // Handle success message
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

        // saveData()
    } else if (e.target.tagName === "BUTTON") {
        console.log(e.target.parentElement.textContent);
        modal.style.display = "revert";
        // modal.innerHTML = e.target.parentElement.textContent
    }
}, false);
