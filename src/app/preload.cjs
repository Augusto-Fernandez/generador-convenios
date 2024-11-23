const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    createPDF: (data) => ipcRenderer.invoke('create-pdf', data)
});
