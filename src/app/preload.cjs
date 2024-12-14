const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    convenioSimple: (data) => ipcRenderer.invoke('convenio-simple', data),
    convenioHonorarios: (data) => ipcRenderer.invoke('convenio-honorarios', data)
});
