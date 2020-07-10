export class Task {
    static list(offset = 0, limit = 10){
        return window.ipcRenderer.sendSync('listTask', { offset, limit });
    }

    static add(task){
        return window.ipcRenderer.sendSync('addTask', task);
    }
}