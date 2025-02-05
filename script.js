// localStorage.clear();
// localStorage initialization and setup
document.addEventListener("DOMContentLoaded", () => {
  const kanbanBoard = document.querySelector(".kanban-board");
  
  // Sample jobs with unique IDs
  const initialJobs = [
      {
          id: 1,
          company: "Amazon",
          position: "Backend Developer",
          salary: "$130k - $180k",
          location: "Seattle, WA",
          priority: "medium",
          match: 85,
          status: "In Process",
      },
      {
          id: 2,
          company: "Netflix",
          position: "UI/UX Designer",
          salary: "$120k - $160k",
          location: "Los Angeles, CA",
          priority: "low",
          match: 70,
          status: "Completed",
      },
      {
          id: 3,
          company: "Tesla",
          position: "Full Stack Engineer",
          salary: "$140k - $190k",
          location: "Austin, TX",
          priority: "high",
          match: 88,
          status: "Interview Scheduled",
      },
      {
          id: 4,
          company: "Microsoft",
          position: "Data Scientist",
          salary: "$145k - $185k",
          location: "Redmond, WA",
          priority: "medium",
          match: 80,
          status: "Applied",
      },
      {
          id: 5,
          company: "Apple",
          position: "iOS Developer",
          salary: "$135k - $175k",
          location: "Cupertino, CA",
          priority: "high",
          match: 92,
          status: "Applied",
      },
  ];


  if (!localStorage.getItem('userTickets')) {
      localStorage.setItem('userTickets', JSON.stringify(initialJobs));
  }


  const userTickets = JSON.parse(localStorage.getItem('userTickets'));
  userTickets.forEach((job) => {
      const ticket = createTicket(job);
      const column = [...kanbanBoard.children].find(
          (col) => col.querySelector(".column-header").textContent === job.status
      );
      if (column) column.appendChild(ticket);
  });
});


function createTicket(data) {
  const ticket = document.createElement("div");
  ticket.className = "ticket";
  ticket.draggable = true;
  ticket.dataset.id = data.id;

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


  ticket.addEventListener("dragstart", (e) => {
      e.target.classList.add("dragging");
  });

  ticket.addEventListener("dragend", (e) => {
      e.target.classList.remove("dragging");
      const newColumn = e.target.closest('.board-column');
      const newStatus = newColumn.querySelector('.column-header').textContent;
      const ticketId = e.target.dataset.id;
      

      const userTickets = JSON.parse(localStorage.getItem('userTickets'));
      const ticketIndex = userTickets.findIndex(t => t.id == ticketId);
      if (ticketIndex !== -1) {
          userTickets[ticketIndex].status = newStatus;
          localStorage.setItem('userTickets', JSON.stringify(userTickets));
      }
  });

  return ticket;
}


const columns = document.querySelectorAll(".board-column");
columns.forEach((column) => {
  column.addEventListener("dragover", (e) => {
      e.preventDefault();
      const draggingTicket = document.querySelector(".dragging");
      column.appendChild(draggingTicket);
  });
});

// Form submission handling

const applicationForm = document.getElementById("applicationForm");
applicationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(applicationForm);

    const newTicketData = {
        id: Date.now(),
        company: formData.get("company"),
        position: formData.get("position"),
        salary: formData.get("salary"),
        location: formData.get("location"),
        priority: formData.get("priority"),
        match: parseInt(formData.get("match"), 10),
        status: formData.get("status")
    };


    const ticket = createTicket(newTicketData);
    const columns = document.querySelectorAll('.board-column');
    

    let targetColumn;
    columns.forEach(column => {
        const headerText = column.querySelector('.column-header').textContent.trim();
        if (headerText === newTicketData.status) {
            targetColumn = column;
        }
    });

    if (targetColumn) {
        targetColumn.appendChild(ticket);
    } else {

        columns[0].appendChild(ticket);
    }


    const userTickets = JSON.parse(localStorage.getItem('userTickets')) || [];
    userTickets.push(newTicketData);
    localStorage.setItem('userTickets', JSON.stringify(userTickets));

    applicationForm.reset();
    document.querySelector(".modal").style.display = "none";
});











const addTicketBtn = document.querySelector(".add-ticket");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close-modal");

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

  currentPriority = currentPriority === "none" ? "high" :
                   currentPriority === "high" ? "medium" :
                   currentPriority === "medium" ? "low" : "none";

  filterBtn.textContent = `Filter by Priority: ${
      currentPriority === "none" ? "None" : 
      currentPriority.charAt(0).toUpperCase() + currentPriority.slice(1)
  }`;
});


const chatBtn = document.querySelector('.chatBotBtn');
chatBtn.addEventListener('click', () => {
  const chatContainer = document.querySelector('.aiChatContainer');
  chatContainer.style.display = chatContainer.style.display === 'none' ? 'flex' : 'none';
});


window.scrollTo({
  top: 0,
  behavior: "smooth",
});
