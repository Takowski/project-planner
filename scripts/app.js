// creating new items
const cardForm = document.getElementById('card-form');
const todoContainer = document.getElementById('todo-container');
const doingContainer = document.getElementById('doing-container');
const doneContainer = document.getElementById('done-container');

cardForm.addEventListener('submit', event => {
    event.preventDefault();
    
    const formData = new FormData(cardForm);
    const card = Object.fromEntries(formData.entries());

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


