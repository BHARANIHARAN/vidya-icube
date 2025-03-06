// JavaScript to toggle role list visibility
const roleInput = document.getElementById('role');
const roleList = document.getElementById('role-list');

roleInput.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click from propagating to the document
    roleList.style.display = roleList.style.display === 'block' ? 'none' : 'block';
});

// JavaScript to select a role and update the input box
function selectRole(role) {
    roleInput.value = role; // Set the selected role in the input box
    roleList.style.display = 'none'; // Hide the role list after selection
}

// Close the role list if clicked outside
document.addEventListener('click', () => {
    roleList.style.display = 'none';
});

// Prevent the role list from closing when clicking inside it
roleList.addEventListener('click', (event) => {
    event.stopPropagation();
});