// Sample data - Replace this with actual API calls
const sampleData = [
    {
        id: "PRJ001",
        title: "Project Alpha",
        submittedBy: "John Doe",
        submissionDate: "2025-03-05",
        status: "pending"
    },
    {
        id: "PRJ002",
        title: "Project Beta",
        submittedBy: "Jane Smith",
        submissionDate: "2025-03-04",
        status: "approved"
    }
];

let currentPage = 1;
const itemsPerPage = 10;
let filteredData = [...sampleData];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    updateDashboardStats();
    renderTable();
    setupEventListeners();
});

function updateDashboardStats() {
    document.getElementById('totalSubmissions').textContent = sampleData.length;
    document.getElementById('pendingReview').textContent = 
        sampleData.filter(item => item.status === 'pending').length;
    document.getElementById('approved').textContent = 
        sampleData.filter(item => item.status === 'approved').length;
    document.getElementById('rejected').textContent = 
        sampleData.filter(item => item.status === 'rejected').length;
}

function setupEventListeners() {
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', function(e) {
        filterData();
    });

    // Status filter
    document.getElementById('statusFilter').addEventListener('change', function(e) {
        filterData();
    });
}

function filterData() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;

    filteredData = sampleData.filter(item => {
        const matchesSearch = 
            item.title.toLowerCase().includes(searchTerm) ||
            item.id.toLowerCase().includes(searchTerm) ||
            item.submittedBy.toLowerCase().includes(searchTerm);
        
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    currentPage = 1;
    renderTable();
}

function renderTable() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const tbody = document.getElementById('submissionsTable');
    tbody.innerHTML = '';

    paginatedData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.submittedBy}</td>
            <td>${item.submissionDate}</td>
            <td>
                <span class="badge ${getStatusBadgeClass(item.status)}">
                    ${capitalizeFirstLetter(item.status)}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewDetails('${item.id}')">
                    View Details
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    updatePagination();
    updateEntryCount();
}

function getStatusBadgeClass(status) {
    switch(status) {
        case 'pending': return 'bg-warning';
        case 'approved': return 'bg-success';
        case 'rejected': return 'bg-danger';
        default: return 'bg-secondary';
    }
}

function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    // Previous button
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `
        <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">
            Previous
        </a>
    `;
    pagination.appendChild(prevLi);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${currentPage === i ? 'active' : ''}`;
        li.innerHTML = `
            <a class="page-link" href="#" onclick="changePage(${i})">
                ${i}
            </a>
        `;
        pagination.appendChild(li);
    }

    // Next button
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `
        <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">
            Next
        </a>
    `;
    pagination.appendChild(nextLi);
}

function updateEntryCount() {
    const startEntry = ((currentPage - 1) * itemsPerPage) + 1;
    const endEntry = Math.min(currentPage * itemsPerPage, filteredData.length);
    
    document.getElementById('currentEntries').textContent = 
        `${startEntry}-${endEntry}`;
    document.getElementById('totalEntries').textContent = filteredData.length;
}

function changePage(page) {
    if (page < 1 || page > Math.ceil(filteredData.length / itemsPerPage)) return;
    currentPage = page;
    renderTable();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function viewDetails(id) {
    // Implement view details functionality
    console.log(`Viewing details for project ${id}`);
}
