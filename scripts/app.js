// Declarations for HTML elements
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
            <div class="card">
                <h2>${card.title}</h2>
                <p>${card.description}</p>
                <p>Due Date: ${card.dueDate}</p>
                <p>time left: ${daysLeft}</p>
                <p>status: ${card.status}</p>
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

    if (card.title.trim() === '') {
        alert('Please enter a title.');
        return;
    }

    if (card.dueDate.trim() === '') {
        alert('Please enter a due date.');
        return;
    }

    const due_date = new Date(card.dueDate);

    if (due_date.getTime() < Date.now()) {
        alert('Please choose a future date.');
        return;
    }

    // Call the function to add the new card to the array and update local storage
    addCard(card);

    // Display only the newly added card
    const dueDate = new Date(card.dueDate);
    const timeLeft = dueDate.getTime() - Date.now();
    const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

    const cardHTML = `
        <div class="card">
            <h2>${card.title}</h2>
            <p>${card.description}</p>
            <p>Due Date: ${card.dueDate}</p>
            <p>time left: ${daysLeft}</p>
            <p>status: ${card.status}</p>
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


