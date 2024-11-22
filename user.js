document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    const themeText = themeToggle.querySelector('span');

    // Theme Toggle Functionality
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        themeText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Light Mode';
    }

    // Form Submission
    const userForm = document.getElementById('userForm');
    const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            dob: document.getElementById('dob').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zip: document.getElementById('zip').value,
            country: document.getElementById('country').value
        };

        addRowToTable(formData);
        userForm.reset();
    });

    // Initialize Flatpickr
    flatpickr(".datepicker", {
        dateFormat: "Y-m-d",
        maxDate: "today",
        yearRange: "1900:2024",
        disableMobile: "true",
        theme: "custom"
    });

    function addRowToTable(data) {
        const row = dataTable.insertRow();
        
        // Add data cells with proper formatting
        Object.entries(data).forEach(([key, value]) => {
            const cell = row.insertCell();
            if (key === 'dob') {
                // Format date to be more readable
                const date = new Date(value);
                cell.textContent = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            } else {
                cell.textContent = value;
            }
        });

        // Create action buttons container
        const actionsCell = row.insertCell();
        actionsCell.style.whiteSpace = 'nowrap';
        
        const updateBtn = document.createElement('button');
        updateBtn.innerHTML = '<i class="fas fa-edit"></i>';
        updateBtn.className = 'btn-update';
        updateBtn.title = 'Edit';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.className = 'btn-delete';
        deleteBtn.title = 'Delete';

        actionsCell.appendChild(updateBtn);
        actionsCell.appendChild(deleteBtn);

        // Delete functionality with confirmation
        deleteBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this record?')) {
                row.style.animation = 'fadeOut 0.3s ease-out forwards';
                setTimeout(() => row.remove(), 300);
            }
        });

        // Update functionality
        updateBtn.addEventListener('click', () => {
            const cells = row.cells;
            document.getElementById('name').value = cells[0].textContent;
            document.getElementById('email').value = cells[1].textContent;
            
            // Convert the formatted date back to YYYY-MM-DD format for the datepicker
            const dobText = cells[2].textContent;
            const dobDate = new Date(dobText);
            const formattedDob = dobDate.toISOString().split('T')[0];
            document.getElementById('dob').value = formattedDob;
            
            document.getElementById('phone').value = cells[3].textContent;
            document.getElementById('address').value = cells[4].textContent;
            document.getElementById('city').value = cells[5].textContent;
            document.getElementById('state').value = cells[6].textContent;
            document.getElementById('zip').value = cells[7].textContent;
            document.getElementById('country').value = cells[8].textContent;
            
            row.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => row.remove(), 300);
        });
    }

    // Add fadeOut animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateY(10px);
            }
        }
    `;
    document.head.appendChild(style);

    // Add this after the theme toggle code
    const clearButton = document.querySelector('.btn-clear');
    clearButton.addEventListener('click', () => {
        userForm.reset();
    });
});
