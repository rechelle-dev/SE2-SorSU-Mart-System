// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

// Navigation click handlers
function showSection(sectionId) {
  // Hide all sections
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('vendor-approvals').style.display = 'none';
  document.getElementById('orders').style.display = 'none';
  
  // Show the selected section
  if (document.getElementById(sectionId)) {
    document.getElementById(sectionId).style.display = 'block';
  }
}

list.forEach((item) => {
  item.addEventListener("click", function(e) {
    e.preventDefault();
    let title = this.querySelector('.title').textContent;
    if (title === 'Vendors') {
      showSection('vendor-approvals');
    } else if (title === 'Dashboard') {
      showSection('dashboard');
    } else if (title === 'Customers') {
      showSection('orders'); // Assuming customers section is in orders
    } else if (title === 'Messages') {
      document.getElementById('messages-modal').style.display = 'block';
    } else if (title === 'Help') {
      document.getElementById('help-modal').style.display = 'block';
    } else if (title === 'Settings') {
      document.getElementById('settings-modal').style.display = 'block';
    } else if (title === 'Password') {
      document.getElementById('password-modal').style.display = 'block';
    } else if (title === 'Sign Out') {
      if (confirm('Are you sure you want to sign out?')) {
        alert('Signed out successfully.');
        // Here you could redirect or do something else
      }
    } else {
      showSection('dashboard'); // Default to dashboard
    }
  });
});

// Show dashboard by default
showSection('dashboard');

// Handle approve and reject buttons
document.addEventListener('DOMContentLoaded', function() {
  // Approve buttons
  document.querySelectorAll('.btn.approve').forEach(btn => {
    btn.addEventListener('click', function() {
      let row = this.closest('tr');
      let name = row.cells[0].textContent;
      alert(`Vendor ${name} approved and is now visible in the system.`);
      // Change the action cell to show approved
      let actionCell = row.cells[3];
      actionCell.innerHTML = '<span class="status approved">Approved</span>';
    });
  });

  // Reject buttons
  document.querySelectorAll('.btn.reject').forEach(btn => {
    btn.addEventListener('click', function() {
      let row = this.closest('tr');
      let name = row.cells[0].textContent;
      alert(`Vendor ${name} rejected.`);
      // Change the action cell to show rejected
      let actionCell = row.cells[3];
      actionCell.innerHTML = '<span class="status rejected">Rejected</span>';
    });
  });

  // Modal close buttons
  document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
      this.closest('.modal').style.display = 'none';
    });
  });

  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
    }
  });
});
