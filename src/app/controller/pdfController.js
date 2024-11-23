import pdfManager from "../managers/pdfManager.js";

const generatePdf = async (data) => {
    try {
        await pdfManager(data);
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        return 1;
    }
};

export default generatePdf;
