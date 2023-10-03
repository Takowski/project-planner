const cardForm = document.getElementById('card-form');
const todoContainer = document.getElementById('todo-container');
const doingContainer = document.getElementById('doing-container');
const doneContainer = document.getElementById('done-container');

// Function to add a new card to the array of cards and update local storage
function addCard(card) {
    const cards = getCards();
    cards.push(card);
    localStorage.setItem('cards', JSON.stringify(cards));
}

// Function to retrieve all cards from local storage
function getCards() {
    return JSON.parse(localStorage.getItem('cards')) || [];
}

// Function to display only the stored cards on page load
function displayStoredCards() {
    const cards = getCards();

    cards.forEach(card => {
        const dueDate = new Date(card.dueDate);
        const timeLeft = dueDate.getTime() - Date.now();
        const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

        const cardHTML = `
            <div class="card" data-title="${card.title}">
                <h2>${card.title}</h2>
                <p>${card.description}</p>
                <p>Due Date: ${card.dueDate}</p>
                <p>time left: ${daysLeft}</p>
                <p>Status: 
                    <select name="status" class="changeStatus">
                        <option value="todo" ${card.status === 'todo' ? 'selected' : ''}>To Do</option>
                        <option value="doing" ${card.status === 'doing' ? 'selected' : ''}>Doing</option>
                        <option value="done" ${card.status === 'done' ? 'selected' : ''}>Done</option>
                    </select>
                </p>
            </div>
        `;

        switch (card.status) {
            case 'todo':
                todoContainer.insertAdjacentHTML('beforeend', cardHTML);
                break;
            case 'doing':
                doingContainer.insertAdjacentHTML('beforeend', cardHTML);
                break;
            case 'done':
                doneContainer.insertAdjacentHTML('beforeend', cardHTML);
                break;
            default:
                break;
        }
    });

    // Add event listeners to the select elements for changing the status
    const changeStatusSelects = document.querySelectorAll('.changeStatus');
    changeStatusSelects.forEach(select => {
        select.addEventListener('change', changeStatus);
    });
}

// Function to handle status change
function changeStatus(event) {
    const selectedOption = event.target.value;
    const card = event.target.closest('.card');
    const cardTitle = card.getAttribute('data-title');

    // Remove the card from its current container
    switch (selectedOption) {
        case 'todo':
            todoContainer.appendChild(card);
            break;
        case 'doing':
            doingContainer.appendChild(card);
            break;
        case 'done':
            doneContainer.appendChild(card);
            break;
        default:
            break;
    }

    // Update the card's status in local storage
    updateCardStatusInStorage(cardTitle, selectedOption);
}

// Function to update card status in local storage
function updateCardStatusInStorage(title, status) {
    const cards = getCards();
    const cardIndex = cards.findIndex(card => card.title === title);
    if (cardIndex !== -1) {
        cards[cardIndex].status = status;
        localStorage.setItem('cards', JSON.stringify(cards));
    }
}

// Load and display existing cards on page load
window.addEventListener('load', () => {
    displayStoredCards();
});

// Update the cardForm event listener to call addCard and display only the new card
cardForm.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(cardForm);
    const card = Object.fromEntries(formData.entries());

    // Call the function to add the new card to the array and update local storage
    addCard(card);

    // Display only the newly added card
    const dueDate = new Date(card.dueDate);
    const timeLeft = dueDate.getTime() - Date.now();
    const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

    const cardHTML = `
        <div class="card" data-title="${card.title}">
            <h2>${card.title}</h2>
            <p>${card.description}</p>
            <p>Due Date: ${card.dueDate}</p>
            <p>time left: ${daysLeft}</p>
            <p>Status: 
                <select name="status" class="changeStatus">
                    <option value="todo" selected>To Do</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </select>
            </p>
        </div>
    `;

    // Insert the new card into the "To Do" container
    todoContainer.insertAdjacentHTML('beforeend', cardHTML);

    // Add an event listener to the new card's select element for status change
    const newCardSelect = todoContainer.lastElementChild.querySelector('.changeStatus');
    newCardSelect.addEventListener('change', changeStatus);

    cardForm.reset();
});




// Sorting items by name & value 
const sortingList = document.getElementById('sortingStatus');
const sections = document.querySelectorAll("section ");

// getting change

sortingList.addEventListener("change", () => {
    const pickedValue = sortingList.value;
    
    // show only the category user picked up 
    
    sections.forEach(function() {
        switch (pickedValue) {
            case  'all' :
            document.getElementById('todo-container').style.display = "block";
            document.getElementById('doing-container').style.display = "block";
            document.getElementById('done-container').style.display = "block";
            break;
            case 'todo' : 
            document.getElementById('todo-container').style.display = "block";
            document.getElementById('doing-container').style.display = "none";
            document.getElementById('done-container').style.display = "none";
            break;
            case 'doing' : 
            document.getElementById('todo-container').style.display = "none";
            document.getElementById('doing-container').style.display = "block";
            document.getElementById('done-container').style.display = "none";
            break;
            case 'done' : 
            document.getElementById('todo-container').style.display = "none";
            document.getElementById('doing-container').style.display = "none";
            document.getElementById('done-container').style.display = "block";
            break;
            
            
        }
        
    })
})
const selectingList = document.getElementById('selectingStatus');
const containers = document.querySelectorAll('.container');

selectingList.addEventListener('change', () => {
    const pickedValue = selectingList.value;

    containers.forEach(container => {
        const cards = container.querySelectorAll('.card');
        const sortedCards = Array.from(cards);

        switch (pickedValue) {
            case 'urgent':
                sortedCards.sort((a, b) => {
                    const aTimeLeft = parseInt(a.querySelector('p:nth-child(4)').textContent.split(' ')[2]);
                    const bTimeLeft = parseInt(b.querySelector('p:nth-child(4)').textContent.split(' ')[2]);
                    return aTimeLeft - bTimeLeft;
                });
                break;
            case 'alphabetical':
                sortedCards.sort((a, b) => {
                    const aTitle = a.querySelector('h2').textContent.toLowerCase();
                    const bTitle = b.querySelector('h2').textContent.toLowerCase();
                    return aTitle.localeCompare(bTitle);
                });
                break;
            default:
                break;
        }

        sortedCards.forEach(card => container.appendChild(card));
    });
});


