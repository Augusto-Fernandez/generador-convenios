import { app, BrowserWindow } from "electron";

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        title:"Generador de Convenios v0.1",
        width: 800,
        height: 600
    });

    mainWindow.loadFile('index.html');
};

const main = async () => {
    try {
        await app.whenReady();
        createWindow();
    } catch (error) {
        console.error("Error al inicializar la aplicación:", error);
    }
};

main();
