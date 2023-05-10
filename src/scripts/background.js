const items = {
    id: "AddTask",
    title: 'Add Task',
    contexts: ['selection']
}
chrome.contextMenus.create(items)

chrome.contextMenus.onClicked.addListener((data) => {
    if (data.menuItemId === 'AddTask') {
        chrome.storage.sync.get(['taskList'], (taskdata) => {
            let taskList = []
            if (taskdata.taskList) {
                taskList = taskdata.taskList;
            }
            taskList.push({
                text: data.selectionText,
                status: false
            });
            chrome.storage.sync.set({ taskList: taskList }
                , () => {
                    console.log('Task List Updated');
                }
            )
        })
    }
})
