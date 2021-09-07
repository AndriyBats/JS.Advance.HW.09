const BACKEND_URL = 'http://localhost:3000/tasks';
const getSel = function (selector) {
    return document.querySelector(selector);
};
const leftF = document.forms.leftF;
const FIELD = getSel('.right-input-text');


getSel('.right-page-button').addEventListener('click', () => {
    const NEW_NAME = FIELD.value;
    if (NEW_NAME) {
        const DATA = {
            task: NEW_NAME
        };
        fetch(BACKEND_URL, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(DATA)
            })
            .then(response => response.json())
            .then(() => getTasks())
            .catch(err => console.log(err))
    } else {
        getSel('.warning').style.display = 'block';
        getSel('.warning-content').textContent = 'Пусте поле не можна добавити.';
    }
})

getSel('.uil').addEventListener('click', function () {
    getSel('.warning').style.display = 'none';
})

function getTasks() {
    fetch(BACKEND_URL)
        .then(response => response.json())
        .then(data => render(data))
        .catch(err => console.log(err))
}
getTasks();

function render(data) {
    const tasks = data;
    getSel('.left-input').innerHTML = '';
    tasks.forEach(element => {
        let template = `
             <p>
                <input data-id="${element.id}" type="checkbox" name="leftInputCheckbox" >
                <span>${element.task}</span>
             </p>`;
        getSel('.left-input').insertAdjacentHTML('beforeend', template)
    });
}




leftF.addEventListener('click', (event) => {
    if (event.target.name === 'leftInputCheckbox') {
        if (document.getElementsByName('leftInputCheckbox').length > 1) {
           const id = event.target.dataset.id;
            fetch(`${BACKEND_URL}/${id}`,{
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(() => getTasks())
            .catch(err => console.log(err))
        } else {
            getSel('.warning').style.display = 'block';
            getSel('.warning-content').textContent = 'Останній таск зі списку Ви не можете видалити.';
        }
    }
})