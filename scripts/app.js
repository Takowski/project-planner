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
            <div class="w-350 max-w-350 card block rounded-lg backdrop-blur-lg bg-white/30 text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700" data-title="${card.title}">
                <h2 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">${card.title}</h2>
                <p class=" mb-4 text-base max-w-full text-neutral-600 dark:text-neutral-200">${card.description}</p>
                <div class="flex justify-center mb-4 space-x-5">
                <p><i class="fa-solid fa-calendar-days"></i> ${card.dueDate}</p>
                <p><i class="fa-regular fa-hourglass-half"></i> ${daysLeft}</p>
                <p><i class="fa-solid fa-arrows-left-right"></i> 
                    <select name="status" class="changeStatus">
                        <option value="todo" ${card.status === 'todo' ? 'selected' : ''}>To Do</option>
                        <option value="doing" ${card.status === 'doing' ? 'selected' : ''}>Doing</option>
                        <option value="done" ${card.status === 'done' ? 'selected' : ''}>Done</option>
                    </select>
                    </p>
                    <button class="delete-button"><i class="fa-solid fa-trash"></i></button>
                </div>
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
     // Add event listeners to the delete buttons to delete the corresponding card
     const deleteButtons = document.querySelectorAll('.delete-button');
     deleteButtons.forEach(button => {
         button.addEventListener('click', () => {
             const cardElement = button.closest('.card');
             deleteCard(cardElement);
         });
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
// mini ruleset for the form to avoid empty title and past due date
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
        <div class="card block w-350 rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700" data-title="${card.title}">
            <h2 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">${card.title}</h2>
            <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">${card.description}</p>
            <p>Due Date: ${card.dueDate}</p>
            <p>time left: ${daysLeft}</p>
            <p>Status: 
                <select name="status" class="changeStatus">
                    <option value="todo" selected>To Do</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </select>
            </p>
            <button class="delete-button">Delete</button>
        </div>
    `;

    // Insert the new card into the "To Do" container
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

    // Add an event listener to the new card's select element for status change
    const newCardSelect = todoContainer.lastElementChild.querySelector('.changeStatus');
    newCardSelect.addEventListener('change', changeStatus);

    // add an event listener to the new card's delete button
    const newCardDeleteButton = todoContainer.lastElementChild.querySelector('.delete-button');
    newCardDeleteButton.addEventListener('click', () => {
        deleteCard(newCardDeleteButton.closest('.card'));
    });


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

// Function to delete a card from local storage and the page
function deleteCard(cardElement) {
    const cardIndex = findCardIndex(cardElement);
    const cards = getCards();
    cards.splice(cardIndex, 1);
    localStorage.setItem('cards', JSON.stringify(cards));
    cardElement.remove();
}

// Function to find the index of a card in the stored cards array
function findCardIndex(cardElement) {
    const cards = getCards();
    const cardTitle = cardElement.querySelector('h2').textContent;
    const cardDescription = cardElement.querySelector('p:nth-child(2)').textContent;
    const cardDueDate = cardElement.querySelector('p:nth-child(3)').textContent.split(' ')[2];
    const cardStatus = cardElement.querySelector('p:nth-child(5)').textContent.split(' ')[1];
    return cards.findIndex(card => card.title === cardTitle && card.description === cardDescription && card.dueDate === cardDueDate && card.status === cardStatus);
} 
