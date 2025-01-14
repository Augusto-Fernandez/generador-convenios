import ConvenioSimpleManager from "../managers/convenioSimpleManager.js";
import ConvenioHonorariosManager from "../managers/convenioHonorariosManager.js";

export const generateConvenioSimple = async (data) => {
    try {
        const manager = new ConvenioSimpleManager(data);
        await manager.createPdf();
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        return 1;
    }
};

export const generateConvenioHonorarios = async (data) => {
    try {
        const manager = new ConvenioHonorariosManager(data);
        await manager.createPdf();
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        return 1;
    }
};
