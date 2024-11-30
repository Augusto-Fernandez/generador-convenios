import ConvenioSimpleManager from "../managers/convenioSimpleManager.js";

const generatePdf = async (data) => {
    try {
        const manager = new ConvenioSimpleManager(data);
        await manager.createPdf();
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        return 1;
    }
};

export default generatePdf;
