const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');

const API_URL = 'http://localhost:3000/api/v1';

// loginBtn.addEventListener('click', async () => {
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     const response = await fetch(`${API_URL}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//     });

//     const data = await response.json();
//     if (response.ok) {
//         localStorage.setItem('token', data.token);
//         console.log("ok")
//         localStorage.setItem('userDetails', JSON.stringify(data.user)); // Store user details
//         // Redirect to the task page
//         window.location.href = 'tasks.html';

//     } else {
//         alert(data.message);
//     }
// });


loginBtn.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userDetails', JSON.stringify(username)); // Store user details
        // Redirect to the task page
        window.location.href = 'task.html';
    } else {
        alert(data.message);
    }
});


registerBtn.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    alert(data.message);
});
