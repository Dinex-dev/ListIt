import { Task } from "./Types";

const script = document.createElement("script");
script.src = chrome.runtime.getURL("dist/scripts/inject.js");

window.onload = () => {
  document.head.insertBefore(script, document.head.firstChild);
  console.log("script injected");
};

window.addEventListener("message", function (event) {
  // We only accept messages from ourselves
  if (event.source != window) return;

  if (event.data.type && event.data.type == "new-task") {
    chrome.storage.sync.get(["taskList"], (taskdata) => {
      let taskList: Task[] = [];
      if (taskdata.taskList) {
        taskList = taskdata.taskList;
      }
      taskList.push({
        text: event.data.text,
        status: false,
      });
      console.log(taskList);
      chrome.storage.sync.set({ taskList: taskList }, () => {
        console.log("Task List Updated");
      });
    });
  }
});
