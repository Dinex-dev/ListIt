const newTask = document.querySelector('#new-task');
const parser = new DOMParser();
const deleteTaskButtons = document.querySelectorAll('#deleteTask');
const newTaskForm = document.querySelector('#newTask');

let taskList = []
chrome.storage.sync.get(['taskList'], (data) => {
    if (data.taskList) {
        taskList = data.taskList;
        renderTask();
    }
})


const renderTask = () => {
    const taskListDom = document.querySelector('#task-list');
    taskListDom.innerHTML = '';
    chrome.storage.sync.set({ taskList: taskList }
        , () => {
            console.log('Task List Updated');
        })
    taskList.forEach((task, index) => {
        const node = parser.parseFromString(
            `<div class="d-flex flex-row mt-1 justify-content-between align-items-center rounded p-0 pl-2 bg-list" role="alert">
                <p class="m-0">${task}</p>
                <button class="btn btn-danger ml-auto p-3" task-index="${index}" id="deleteTask">
                    <i class="bi bi-trash"></i>
                    </button>
            </div>` , 'text/html').body.firstChild

        node.childNodes[3].addEventListener('click', (e) => {
            taskList.splice(e.target.getAttribute('task-index'), 1);
            renderTask();
        })
        taskListDom.appendChild(node)
    })
}

const addTask = (task) => {
    taskList.push(task);
    renderTask();
}

newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (e.target.elements[0].value === '') return;
    addTask(e.target.elements[0].value);
    e.target.reset();
})