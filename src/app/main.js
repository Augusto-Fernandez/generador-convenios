import { app, BrowserWindow } from "electron";
import { ipcMain } from "electron";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { generateConvenioSimple, generateConvenioHonorarios } from "./controller/pdfController.js";

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        title: "Generador de Convenios v0.1",
        width: 800,
        height: 600,
        webPreferences: {
            preload: getPreloadPath()
        },
        autoHideMenuBar: true,
        contextIsolation: true,
        enableRemoteModule: false,
        nodeIntegration: false,
    });

    mainWindow.loadFile(getUIPath());
};

const main = async () => {
    try {
        await app.whenReady();
        createWindow();

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });
    } catch (error) {
        console.error("Error al inicializar la aplicación:", error);
    }
};

main();

ipcMain.handle('convenio-simple', async (event, data) => {
    await generateConvenioSimple(data);
});

ipcMain.handle('convenio-honorarios', async (event, data) => {
    await generateConvenioHonorarios(data);
});
