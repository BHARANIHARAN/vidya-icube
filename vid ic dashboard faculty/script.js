document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle
    document.getElementById('sidebarCollapse').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('active');
    });

    // Initialize Bootstrap tooltips and popovers
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

   
    // Project Upload Form Submission
    const projectUploadForm = document.getElementById('projectUploadForm');
    projectUploadForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Gather team members data
        const teamMembers = [];
        const memberRows = teamMembersContainer.querySelectorAll('.row');
        memberRows.forEach(row => {
            const inputs = row.querySelectorAll('input');
            teamMembers.push({
                name: inputs[0].value,
                email: inputs[1].value,
                rollNumber: inputs[2].value
            });
        });

        // Create project data object
        const projectData = {
            title: document.getElementById('projectTitle').value,
            category: document.getElementById('projectCategory').value,
            description: document.getElementById('projectDescription').value,
            teamMembers: teamMembers,
            files: document.getElementById('projectFiles').files,
            submissionDate: new Date().toISOString()
        };

        // Here you would typically send this data to your backend
        console.log('Project Data:', projectData);
        
        // For demonstration, add to recent uploads
        addToRecentUploads(projectData);
        
        // Reset form
        projectUploadForm.reset();
        alert('Project submitted successfully!');
    });

    // Add project to recent uploads table
    function addToRecentUploads(project) {
        const recentUploadsTable = document.getElementById('recentUploads');
        const row = document.createElement('tr');
        
        const teamMemberNames = project.teamMembers.map(member => member.name).join(', ');
        const submissionDate = new Date(project.submissionDate).toLocaleDateString();
        
        row.innerHTML = `
            <td>${project.title}</td>
            <td>${teamMemberNames}</td>
            <td>${submissionDate}</td>
            <td><span class="badge bg-info">Pending Review</span></td>
            <td>
                <button class="btn btn-sm btn-primary" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-secondary" title="Download Files">
                    <i class="fas fa-download"></i>
                </button>
            </td>
        `;
        
        recentUploadsTable.insertBefore(row, recentUploadsTable.firstChild);
    }

    // Auto-hide sidebar on mobile when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const sidebar = document.getElementById('sidebar');
            const sidebarToggle = document.getElementById('sidebarCollapse');
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target) && !sidebar.classList.contains('active')) {
                sidebar.classList.add('active');
            }
        }
    });
});