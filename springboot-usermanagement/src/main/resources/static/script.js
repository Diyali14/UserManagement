const BASE_URL = "http://localhost:8080/api/users";

// State
let usersList = [];

// Elements
const notifContainer = document.getElementById('notif-container');

// Forms & Input Buttons
const createUserForm = document.getElementById('create-user-form');
const searchUserForm = document.getElementById('search-user-form');
const updateUserForm = document.getElementById('update-user-form');
const createUserBtn = createUserForm.querySelector('button[type="submit"]');
const fetchUserBtn = searchUserForm.querySelector('button[type="submit"]');
const updateUserBtn = updateUserForm.querySelector('button[type="submit"]');

// Tables and Sections
const usersTableBody = document.querySelector('#users-table tbody');
const loadUsersBtn = document.getElementById('load-users-btn');
const searchResult = document.getElementById('search-result');

// Modal Elements
const updateModal = document.getElementById('update-modal');
const closeModalBtn = document.getElementById('close-modal');
const cancelUpdateBtn = document.getElementById('cancel-update');

// ---------------------------
// Helpers
// ---------------------------
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerText = message;
  
  notifContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3500);
}

function setLoading(button, isLoading) {
  if (isLoading) {
    if (!button.dataset.originalText) {
      button.dataset.originalText = button.innerText;
    }
    button.innerText = 'Loading...';
    button.disabled = true;
    button.style.opacity = '0.7';
    button.style.cursor = 'not-allowed';
  } else {
    button.innerText = button.dataset.originalText || button.innerText;
    button.disabled = false;
    button.style.opacity = '1';
    button.style.cursor = 'pointer';
  }
}

async function handleResponseError(res) {
  if (!res.ok) {
    let errText = '';
    try {
      errText = await res.text();
    } catch (e) {}
    
    if (res.status === 404) {
      throw new Error('User not found (404)');
    } else if (res.status === 400) {
      throw new Error(errText ? `Bad Request (400): ${errText}` : 'Bad Request (400)');
    } else {
      throw new Error(errText ? `Error ${res.status}: ${errText}` : `Error ${res.status}`);
    }
  }
  return res;
}

// ---------------------------
// 1. Create User
// ---------------------------
createUserForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  setLoading(createUserBtn, true);
  
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();

  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email })
    });

    await handleResponseError(res);

    let data = {};
    try { data = await res.json(); } catch(e) {}
    
    showToast(`User ${data.firstName || firstName} created successfully!`, 'success');
    createUserForm.reset();
    fetchAllUsers();

  } catch (error) {
    showToast(error.message, 'error');
  } finally {
    setLoading(createUserBtn, false);
  }
});

// ---------------------------
// 2. Get User By ID
// ---------------------------
searchUserForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  setLoading(fetchUserBtn, true);
  
  const id = document.getElementById('searchId').value.trim();
  searchResult.classList.add('hidden');
  searchResult.innerHTML = '';

  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    
    await handleResponseError(res);
    const user = await res.json();
    
    searchResult.innerHTML = `
      <div class="user-info">
        <p><strong>ID:</strong> ${user.id}</p>
        <p><strong>Name:</strong> ${user.firstName} ${user.lastName}</p>
        <p><strong>Email:</strong> ${user.email}</p>
      </div>
    `;
    searchResult.classList.remove('hidden');

  } catch (error) {
    showToast(error.message, 'error');
  } finally {
    setLoading(fetchUserBtn, false);
  }
});

// ---------------------------
// 3. Get All Users
// ---------------------------
async function fetchAllUsers() {
  setLoading(loadUsersBtn, true);
  
  try {
    const res = await fetch(BASE_URL);
    await handleResponseError(res);
    
    usersList = await res.json();
    renderUsersTable();
  } catch (error) {
    showToast(error.message, 'error');
    usersTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-muted">Error loading users. Backend might be down.</td>
      </tr>
    `;
  } finally {
    setLoading(loadUsersBtn, false);
  }
}

function renderUsersTable() {
  usersTableBody.innerHTML = '';
  
  if (!usersList || usersList.length === 0) {
    usersTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-muted">No users found. Create one above!</td>
      </tr>
    `;
    return;
  }

  usersList.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
      <td>
        <div class="action-btns">
          <button class="btn btn-edit" onclick="openUpdateModal(${user.id})">Edit</button>
          <button class="btn btn-danger" id="delete-btn-${user.id}" onclick="deleteUser(${user.id})">Delete</button>
        </div>
      </td>
    `;
    usersTableBody.appendChild(tr);
  });
}

loadUsersBtn.addEventListener('click', fetchAllUsers);

// ---------------------------
// 4. Update User
// ---------------------------
window.openUpdateModal = function(id) {
  const user = usersList.find(u => Number(u.id) === Number(id));
  if (!user) {
    showToast('Error: User not found in local table', 'error');
    return;
  }

  document.getElementById('updateId').value = user.id;
  document.getElementById('updateFirstName').value = user.firstName;
  document.getElementById('updateLastName').value = user.lastName;
  document.getElementById('updateEmail').value = user.email;

  updateModal.classList.remove('hidden');
};

function closeModal() {
  updateModal.classList.add('hidden');
  updateUserForm.reset();
}

closeModalBtn.addEventListener('click', closeModal);
cancelUpdateBtn.addEventListener('click', closeModal);

updateUserForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  setLoading(updateUserBtn, true);
  
  const id = document.getElementById('updateId').value;
  const firstName = document.getElementById('updateFirstName').value.trim();
  const lastName = document.getElementById('updateLastName').value.trim();
  const email = document.getElementById('updateEmail').value.trim();

  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email })
    });

    await handleResponseError(res);

    showToast('User updated successfully!', 'success');
    closeModal();
    fetchAllUsers(); 

  } catch (error) {
    showToast(error.message, 'error');
  } finally {
    setLoading(updateUserBtn, false);
  }
});

// ---------------------------
// 5. Delete User
// ---------------------------
window.deleteUser = async function(id) {
  if (!confirm('Are you sure you want to delete this user?')) return;
  
  const delBtn = document.getElementById(`delete-btn-${id}`);
  if (delBtn) setLoading(delBtn, true);

  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });

    await handleResponseError(res);

    showToast('User deleted successfully!', 'success');
    fetchAllUsers(); 

  } catch (error) {
    showToast(error.message, 'error');
    if (delBtn) setLoading(delBtn, false);
  }
};

// Initial Load when DOM is ready
document.addEventListener('DOMContentLoaded', fetchAllUsers);
