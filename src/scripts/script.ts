import { Task } from "./Types";

const newTask = document.querySelector("#new-task");
const parser = new DOMParser();
const deleteTaskButtons = document.querySelectorAll("#deleteTask");
const newTaskForm = document.querySelector("#newTask");

let taskList: Task[] = [];
chrome.storage.sync.get(["taskList"], (data) => {
  if (data.taskList) {
    taskList = data.taskList;
    renderTask();
  }
});

const renderTask = () => {
  const taskListDom = document.querySelector("#task-list")!;
  taskListDom.innerHTML = "";
  chrome.storage.sync.set({ taskList: taskList }, () => {
    console.log("Task List Updated");
  });
  taskList.forEach((task, index) => {
    const node = parser.parseFromString(
      `<div class="d-flex flex-row mt-1 justify-content-between align-items-center rounded p-0 pl-2 bg-list" role="alert">
            <input type="checkbox" ${
              task.status && "checked"
            } class="form-check-input" id="taskCheck">
                <p class="m-0">${task.text}</p>
                <button class="btn btn-danger ml-auto p-3" task-index="${index}" id="deleteTask">
                    <i class="bi bi-trash"></i>
                    </button>
            </div>`,
      "text/html"
    ).body.firstChild!;
    node.childNodes[5].addEventListener("click", (e) => {
      const target = e.target as Element;
      taskList.splice(parseInt(target?.getAttribute("task-index")!), 1);
      renderTask();
    });
    node.childNodes[1].addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;
      task.status = target?.checked;
      renderTask();
    });
    taskListDom.appendChild(node);
  });
};

const addTask = (task) => {
  taskList.push(task);
  renderTask();
};

newTaskForm?.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  const target = e.target as HTMLFormElement;
  const input = (target?.elements[0] as HTMLFormElement).value;
  if (input === "") return;
  addTask({
    text: input,
    status: false,
  });
  target?.reset();
});
