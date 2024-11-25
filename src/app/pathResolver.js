import path from 'node:path';
import { app } from "electron";
import { fileURLToPath } from 'url';

export function getPreloadPath() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    return path.join(__dirname, 'preload.cjs');
}

export function getUIPath() {
    return path.join(app.getAppPath(), "/dist/index.html");
}

export function getLogoPath() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    return path.join(__dirname, "../public/logo.jpg");
}
