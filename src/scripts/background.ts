import { Task } from "./Types";

chrome.contextMenus.create({
  id: "AddTask",
  title: "Add Task",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener((data) => {
  if (data.menuItemId === "AddTask") {
    chrome.storage.sync.get(["taskList"], (taskdata) => {
      let taskList: Task[] = [];
      if (taskdata.taskList) {
        taskList = taskdata.taskList;
      }
      taskList.push({
        text: data.selectionText?.toString() || "",
        status: false,
      });
      chrome.storage.sync.set({ taskList: taskList }, () => {
        console.log("Task List Updated");
      });
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "log") {
    chrome.storage.sync.set({ ["taskList"]: request.data });
  }
});
