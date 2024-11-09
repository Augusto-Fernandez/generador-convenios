import { app, BrowserWindow } from "electron";
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        title: "Generador de Convenios v0.1",
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');
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
