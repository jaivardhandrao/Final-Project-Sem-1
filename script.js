// localStorage.clear()

document.addEventListener("DOMContentLoaded", () => {
    const kanbanBoard = document.querySelector(".kanban-board");
    
    
    const jobs = [
      {
        company: "Amazon",
        position: "Backend Developer",
        salary: "$130k - $180k",
        location: "Seattle, WA",
        priority: "medium",
        match: 85,
        status: "In Process",
      },
      {
        company: "Netflix",
        position: "UI/UX Designer",
        salary: "$120k - $160k",
        location: "Los Angeles, CA",
        priority: "low",
        match: 70,
        status: "Completed",
      },
      {
        company: "Tesla",
        position: "Full Stack Engineer",
        salary: "$140k - $190k",
        location: "Austin, TX",
        priority: "high",
        match: 88,
        status: "Interview Scheduled",
      },
      {
        company: "Microsoft",
        position: "Data Scientist",
        salary: "$145k - $185k",
        location: "Redmond, WA",
        priority: "medium",
        match: 80,
        status: "Applied",
      },
      {
        company: "Apple",
        position: "iOS Developer",
        salary: "$135k - $175k",
        location: "Cupertino, CA",
        priority: "high",
        match: 92,
        status: "Applied",
      },
      
    ];
  
    // Create default tickets
    jobs.forEach((job) => {
      const ticket = createTicket(job);
      const column = [...kanbanBoard.children].find(
        (col) => col.querySelector(".column-header").textContent === job.status
      );
      if (column) column.appendChild(ticket);
    });
  
    // Load user-created tickets from localStorage
    const userTickets = JSON.parse(localStorage.getItem('userTickets')) || [];
    userTickets.forEach(job => {
      const ticket = createTicket(job);
      const column = [...kanbanBoard.children].find(
        (col) => col.querySelector(".column-header").textContent === job.status
      );
      if (column) column.appendChild(ticket);
    });
  });
  
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  
  const addTicketBtn = document.querySelector(".add-ticket");
  const modal = document.querySelector(".modal");
  const closeModal = document.querySelector(".close-modal");
  const applicationForm = document.getElementById("applicationForm");
  const kanbanBoard = document.querySelector(".kanban-board");
  
  // Event Listeners
  addTicketBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });
  
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
  
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
  
  // Handle form submission
  applicationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(applicationForm);
  
    // Create new ticket data object
    const newTicketData = {
      company: formData.get("company"),
      position: formData.get("position"),
      salary: formData.get("salary"),
      location: formData.get("location"),
      priority: formData.get("priority"),
      match: parseInt(formData.get("match"), 10),
      status: formData.get("status")
    };
  
    // Create and append ticket
    const ticket = createTicket(newTicketData);
    const column = [...kanbanBoard.children].find(
      (col) => col.querySelector(".column-header").textContent === newTicketData.status
    );
    if (column) column.appendChild(ticket);
  
    // Save to localStorage
    const userTickets = JSON.parse(localStorage.getItem('userTickets')) || [];
    userTickets.push(newTicketData);
    localStorage.setItem('userTickets', JSON.stringify(userTickets));
  
    // Reset form
    applicationForm.reset();
    modal.style.display = "none";
  });
  
  // Create ticket element (keep original functionality)
  function createTicket(data) {
    const ticket = document.createElement("div");
    ticket.className = "ticket";
    ticket.draggable = true;
  
    ticket.innerHTML = `
      <div class="ticket-header">
        <span class="company-name">${data.company}</span>
        <span class="priority priority-${data.priority}">${
      data.priority.charAt(0).toUpperCase() + data.priority.slice(1)
    }</span>
      </div>
      <div class="ticket-details">
        <div class="detail-item">
          <i class="fas fa-briefcase"></i>
          <span>${data.position}</span>
        </div>
        <div class="detail-item">
          <i class="fas fa-money-bill-wave"></i>
          <span>${data.salary}</span>
        </div>
        <div class="detail-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>${data.location}</span>
        </div>
        <div class="detail-item">
          <i class="fas fa-chart-line"></i>
          <span>${data.match}% Match</span>
        </div>
      </div>
    `;
  
    // Drag and drop functionality
    ticket.addEventListener("dragstart", (e) => {
      e.target.classList.add("dragging");
    });
  
    ticket.addEventListener("dragend", (e) => {
      e.target.classList.remove("dragging");
    });
  
    return ticket;
  }
  
  // Drag and drop functionality for columns
  const columns = document.querySelectorAll(".board-column");
  columns.forEach((column) => {
    column.addEventListener("dragover", (e) => {
      e.preventDefault();
      const draggingTicket = document.querySelector(".dragging");
      column.appendChild(draggingTicket);
    });
  });
  
  // Priority filtering
  const filterBtn = document.querySelector(".filter-btn");
  let currentPriority = "none";
  
  filterBtn.addEventListener("click", () => {
    const tickets = document.querySelectorAll(".ticket");
    const priorities = ["high", "medium", "low"];
  
    tickets.forEach((ticket) => {
      const ticketPriority = ticket
        .querySelector(".priority")
        .classList[1].split("-")[1];
      if (currentPriority === "none") {
        ticket.style.display = "block";
      } else if (ticketPriority !== currentPriority) {
        ticket.style.display = "none";
      } else {
        ticket.style.display = "block";
      }
    });
  
    if (currentPriority === "none") {
      currentPriority = "high";
    } else if (currentPriority === "high") {
      currentPriority = "medium";
    } else if (currentPriority === "medium") {
      currentPriority = "low";
    } else {
      currentPriority = "none";
    }
  
    filterBtn.textContent = `Filter by Priority: ${
      currentPriority.charAt(0).toUpperCase() + currentPriority.slice(1)
    }`;
  });




let chatBtn = document.querySelector('.chatBotBtn');

chatBtn.addEventListener('click' , ()=>{
  let chatContainer = document.querySelector('.aiChatContainer');
  if(chatContainer.style.display == 'none'){
    chatContainer.style.display = 'flex';
  }else{
    chatContainer.style.display = 'none'
  }
})


function toggleChat(){
  let chatContainer = document.querySelector('.aiChatContainer');
  chatContainer.style.display = 'none'
}
