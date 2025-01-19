import ConvenioSimpleManager from "../managers/convenioSimpleManager.js";
import ConvenioHonorariosManager from "../managers/convenioHonorariosManager.js";

import convenioSimpleValidation from "../validations/convenioSimple.js";
import convenioHonorariosValidation from "../validations/convenioHonorarios.js";

export const generateConvenioSimple = async (data) => {
    try {
        await convenioSimpleValidation.parseAsync(data);
        const manager = new ConvenioSimpleManager(data);
        await manager.createPdf();
        return;
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        return null;
    }
};

export const generateConvenioHonorarios = async (data) => {
    try {
        await convenioHonorariosValidation.parseAsync(data);
        const manager = new ConvenioHonorariosManager(data);
        await manager.createPdf();
        return;
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        return null;
    }
};
