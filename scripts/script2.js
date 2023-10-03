// Create a localStorage object to store the todo cards.



// Creating new items
const cardForm = document.getElementById('card-form');
const todoContainer = document.getElementById('todo-container');
const doingContainer = document.getElementById('doing-container');
const doneContainer = document.getElementById('done-container');


JSON.parse(localStorage.getItem('todoCards'))


cardForm.addEventListener('submit', event => {
    event.preventDefault();
    
    const formData = new FormData(cardForm);
    const card = Object.fromEntries(formData.entries());

    const dueDate = new Date(card.dueDate);
    const timeLeft = dueDate.getTime() - Date.now();
    const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

    // Serialize the card to JSON and store it in localStorage.
    const serializedCard = JSON.stringify(card);
    localStorage.setItem('todoCards', serializedCard);

    // Display the card in the corresponding container.
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

    // Filter the localStorage object to only include the cards that match the selected category.
    const filteredTodoCards = JSON.parse(localStorage.getItem('todoCards')).filter(card => card.status === pickedValue);

    // Clear the todo containers.
    todoContainer.innerHTML = '';
    doingContainer.innerHTML = '';
    doneContainer.innerHTML = '';

    // Display the filtered todo cards in the corresponding containers.
    filteredTodoCards.forEach(card => {
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
});