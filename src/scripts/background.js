const items = {
    id: "AddTask",
    title: 'Add Task',
    contexts: ['selection']
}
chrome.contextMenus.create(items)

chrome.contextMenus.onClicked.addListener((data) => {
    if (data.menuItemId === 'AddTask' && data.selectionText) {
        chrome.storage.sync.get(['taskList'], (data) => {
            let taskList = []
            if (data.taskList) {
                taskList = data.taskList;
            }
            taskList.push(String(data.selectionText));
            chrome.storage.sync.set({ taskList: taskList }
                , () => {
                    console.log('Task List Updated');
                })
        })
    }
})

