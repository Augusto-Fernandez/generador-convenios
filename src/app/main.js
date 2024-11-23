import { app, BrowserWindow } from "electron";
import path from 'node:path';
import { fileURLToPath } from 'url';
import { ipcMain } from "electron";
import { PDFDocument } from "pdf-lib";
import fs from "fs/promises"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        title: "Generador de Convenios v0.1",
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs')
        },
        autoHideMenuBar: true,
        contextIsolation: true,
        enableRemoteModule: false,
        nodeIntegration: false,
    });

    mainWindow.loadFile(path.join(app.getAppPath(), "/dist/index.html"));
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

ipcMain.handle('create-pdf', async (event, data) => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      page.drawText('You can create PDFs!');
  
      const pdfBytes = await pdfDoc.save();
      await fs.writeFile(`${data.nroSiniestro}.pdf`, pdfBytes);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      return { success: false, error: error.message };
    }
});
