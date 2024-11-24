import { PDFDocument, StandardFonts } from "pdf-lib";
import fs from "fs/promises"
import dotenv from "dotenv";
dotenv.config();

const pdfManager = async (data) => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("es-ES", { month: "long" });
    const year = today.getFullYear();

    const body = `Entre el/la Sr./Sra. ${data.nombre3roPropietario.toUpperCase()} DNI/LC/LE N° ……………. con domicilio en …………., de ${process.env.CIUDAD}, provincia de ${process.env.PROVINCIA}, en adelante “La Reclamante”, por un lado, y el ${process.env.ABOGADO} en representación de ${process.env.COMPANIA}, con domicilio legal en calle ${process.env.DIRECCION_COMPANIA}, en adelante “La Aseguradora” por el otro, convienen celebrar el presente acuerdo conciliatorio y de desistimiento de acciones, sujeto a las cláusulas que a continuación se detallan:  
    ----------------------------------------------------------
    PRIMERA: El día ${data.fechaSiniestro.toUpperCase()} ocurrió un siniestro de tránsito en inmediaciones de ${data.lugarSiniestro.toUpperCase()}, ${data.ciudadOcurrencia.toUpperCase()}  en el que intervino el vehículo asegurado en ${process.env.COMPANIA} marca y modelo ${data.vehiculoAsegurado.toUpperCase()} dominio ${data.patenteVehiculoAsegurado.toUpperCase()} conducido en esa ocasión por ${data.conductorVehiculoAsegurado.toUpperCase()} DNI ${data.dniConductorAsegurado.toUpperCase()} propiedad de ${data.propietarioAsegurado.toUpperCase()} y el rodado marca y modelo ${data.vehiculoTercero.toUpperCase()}  dominio ${data.patente3ro.toUpperCase()}  conducido en esa ocasión ${data.conductor3ro.toUpperCase()} y propiedad de ${data.nombre3roPropietario.toUpperCase()}.-
    ----------------------------------------------------------
    SEGUNDA: Producto del evento referido resultó con daños materiales la unidad del Reclamante; a consecuencia de ello y por los daños y perjuicios sufridos, “La Reclamante” interpuso formal reclamo extrajudicial pretendiendo ser indemnizada por los mismos en el siniestro que nos ocupa.- 
    ----------------------------------------------------------
    TERCERA: Considerando los antecedentes particulares del siniestro de marras, La Reclamante expresa formalmente su pretensión resarcitoria a ${process.env.COMPANIA}, por la suma de ${data.sumaIndemnizacionTexto.toUpperCase()} ($${data.sumaIndemnizacion.toUpperCase()}.-) por la REPARACIÓN PLENA E INTEGRAL DE LOS DAÑOS Y PERJUICIOS SUFRIDOS, que abarca todo rubro y/o concepto que pudiere corresponder en sentido estricto y en sentido amplio en los términos del Código Civil y Comercial de la Nación: daños en el vehículo.su privación de uso y desvalorización venal, daño extrapatrimonial, daño no patrimonial en sentido amplio, daño patrimonial en sentido amplio, daño directo o indirecto, daño actual, daño futuro, daño material emergente, salarios caídos, lucro cesante, gastos de todo tipo, daño compensatorio, daño moratorio,  intereses, honorarios y aportes profesionales, etc.;  que pueda serle reclamado a ${process.env.COMPANIA} en virtud de la obligación de garantía asumida en los términos y dentro de los límites de la cobertura de la Póliza de Responsabilidad Civil contratada por su asegurado,  y/o al conductor al momento del hecho, proponiendo a “La Aseguradora” transar libremente el presente asunto sin que ello signifique reconocimiento de hechos, derechos, ni de responsabilidad civil o penal de parte de ésta ni de su asegurado (formalizándose al solo efecto conciliatorio y para evitar la acción civil por daños y perjuicios), no existiendo vicios de ninguna índole que afecten la plena validez del acto que se otorga.
    ----------------------------------------------------------
    CUARTA: La Aseguradora acepta la pretensión por la suma de Pesos y los conceptos establecidos en la Cláusula Tercera, que abarcan capital indemnizatorio, actualizaciones e intereses y gastos, siendo las costas por su orden, a liquidar mediante Cheque/transferencia según datos obrantes al pie del presente acuerdo,  en el plazo máximo de veinte días desde la firma  del presente Acuerdo, que ostenta el carácter de formal y suficiente Carta de Pago cancelatoria y definitiva.
    ----------------------------------------------------------
    QUINTA: Deja constancia "La Reclamante" que el pago acordado es liberatorio de todos los conceptos que se pudieren pretender por el accidente de marras y que fueron objeto del reclamo detallado. Asimismo manifiestan que nada más tienen que peticionar al asegurado ${data.propietarioAsegurado.toUpperCase()} de a ${process.env.COMPANIA}, quedando los nombrados total, definitiva e irrevocablemente liberados de cualquier obligación emergente del siniestro aludido, renunciando además “La Reclamante” a cualquier acción extrajudicial y/o judicial, civil y/o penal, iniciada o a iniciar contra aquéllos, considerándose definitiva y totalmente indemnizada. La Reclamante declara ser la única persona con derecho a peticionar resarcimiento por los daños y perjuicios sufridos, no existiendo terceras personas físicas ni jurídicas, como tampoco instituciones de ninguna índole, que puedan reclamar con origen en este accidente, siendo la indemnización recibida integral, única y definitiva. Manifiesta además que no ha recibido prestación alguna otorgada por Aseguradoras de riesgos del Trabajo por el siniestro que nos ocupa. El presente acuerdo podrá presentarse en las Actuaciones Penales del Ministerio Público de la Acusación a los fines de solicitar al mismo que desestime de la acción penal promovida si existiera, toda vez que en la presente conciliación se desiste de las acciones por los daños y perjuicios sufridos y manifiesta La Reclamante su desinterés en la persecución penal del Sr. de de ${data.propietarioAsegurado.toUpperCase()}.-
    SEXTA: En caso de incumplimiento del presente, las partes acuerdan libremente la jurisdicción de los tribunales ordinarios con competencia en la ciudad de ${process.env.CIUDAD} Provincia de ${process.env.PROVINCIA}, renunciando desde ya a cualquier otro fuero y/o jurisdicción que pudiere corresponder, inclusive el Federal. Los domicilios más arriba denunciados se tendrán como válidos para cualquier notificación extrajudicial y/o judicial que sea cursada por las partes.
    ----------------------------------------------------------
    Previa lectura y ratificación del contenido del presente, se firman de plena conformidad dos ejemplares de un mismo tenor y a un solo efecto, en la ciudad de ${process.env.CIUDAD} Provincia de ${process.env.PROVINCIA}, a los ${day} días del mes de ${month} de ${year}.
    "El presente documento es ORIGINAL y se remite en archivo digital a su destinataria ${process.env.COMPANIA} en virtud de las circunstancias extraordinarias y Fuerza Mayor según las medidas dispuestas en la República Argentina s/D.N.U. de fecha 19/03/2020. Declaro/amos bajo juramento el archivo digital que se remite desde la casilla de correo ".........................................@.................................." ES INSTRUMENTO ORIGINAL a todos los efectos legales, de conformidad a lo dispuesto por los Arts. 284, 286, ssgts y ccs del Código Civil y Comercial de la Nación".


    Firma:………………………………………………


    Aclaración:…………………………………………


    DNI:………………………………………………..


    CUIL – CUIT ……………………………………..`.replace(/\r/g, "");
                                //saca el retorno de carro

    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    //ancho de una hoja A4
    const pageWidth = 595.28;
    //alto de una hoja A4
    const pageHeight = 841.89;
    const margin = 50;

    //ancho máximo del texto
    //es el ancho de la pagina A4 menos los dos margenes
    const maxWidth = pageWidth - margin * 2;
    const lineSpacing = 1.2;

    //Se encarga en dividir el texto en lineas que estén dentro del maxWidth
    const splitTextIntoLinesWithNewlines = (text, font, fontSize, maxWidth) => {
        //divide en rawLines respetando los saltos de línea que ya existen
        /*Ej:
            Línea uno con texto
            Línea dos

            queda:
            rawLines = ["Línea uno con texto", "Línea dos"];
        */
        const rawLines = text.split("\n");
        const formattedLines = [];

        rawLines.forEach((rawLine) => {
            //divide en cada rawline en un array de palabras individuales borrando los espacios
            const words = rawLine.split(" ");
            //va a guardar la linea de texto ajustada
            let currentLine = "";

            words.forEach((word) => {
                //almacena la linea de texto provisoria va a evaluar después
                let testLine

                //"" es falsy por lo que si no hay un linea, agregar el primer word del array
                if(currentLine){
                    testLine = `${currentLine} ${word}`
                }else{
                    testLine = word
                }

                //calcula el ancho de testLine
                //widthOfTextAtSize es un método de pdf-lib que calcula el ancho de una linea de acuerdo a un string y int basado en el tamaño de la fuente
                const testLineWidth = font.widthOfTextAtSize(testLine, fontSize);
                //si el ancho de testLine es mayor al ancho máximo del texto
                if (testLineWidth > maxWidth) {
                    //pushea la currentLine (no testLine) a la array de lineas formateadas
                    formattedLines.push(currentLine);
                    //hace una nueva currentLine que empieza como la palabra que se está evaluando
                    currentLine = word;
                } else {
                    //si l ancho de testLine no es mayor al ancho máximo del texto
                    //hace que currentLine sea testLine
                    currentLine = testLine;
                }
            });

            //si currentLine no es un string vacio, lo pushea al array de las lineas formateadas
            if(currentLine){
                formattedLines.push(currentLine);
            }
        });

        //devuelve el array de las lineas formateadas
        return formattedLines;
    };

    //calcula el tamaño máximo de la fuente dentro de un espacio específico
    //maxWidth y MaxHeight son las medidas máximas
    const calculateFontSize = (text, font, maxWidth, maxHeight) => {
        let fontSize = 12;
        //altura del texto, lo inicializa en 0
        let textHeight = 0;

        //se usa while porque va a probar cual tamaño de fuente corresponde
        //con cada iteración, baja el tamaño de la fuente
        while (fontSize > 1) {
            //divide al texto en lineas que usan el tamaño de la fuente
            const lines = splitTextIntoLinesWithNewlines(text, font, fontSize, maxWidth);
            //establece la altura del texto como la cantidad de lineas por la multiplicación del tamaño de la fuente y el interlineado
            textHeight = lines.length * (fontSize * lineSpacing);
            //si la altura del texto es menor o igual a la altura máxima del texto
            if (textHeight <= maxHeight) {
                //corta la ejecución del while
                break;
            }
            //si la altura del texto es mayor a la altura máxima del texto, baja 0.5 el tamaño de la fuente y ejecute otra vez el bucle
            fontSize -= 0.5;
        }

        return fontSize;
    };

    //calcula el tamaño de la fuente. Como maxHeight le pasa el alto de una hoja A4 menos el margen de arriba y abajo
    const fontSize = calculateFontSize(body, font, maxWidth, pageHeight - margin * 2);
    //divide el texto en lineas de acuerdo al tamaño de fuente que corresponde
    const lines = splitTextIntoLinesWithNewlines(body, font, fontSize, maxWidth);

    //crea una pagina con los tamaños de una hoja A4
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    //esta variable rastrea la posición vertical donde se empieza a dibujar el texto
    //se inicializa en la altura de la pagina menos el margen superior
    let currentY = pageHeight - margin;

    //itera por cada linea del texto formateado
    lines.forEach((line) => {
        //verifica si currentY está por encima del margen inferior
        if (currentY < margin) {
            //si currentY está por debajo del margen inferior
            //lo reinicia
            currentY = pageHeight - margin;
            //crea una nueva pagina con tamaño de hoja A4
            page = pdfDoc.addPage([pageWidth, pageHeight]);
        }
        //si currentY está por encima del margen inferior
        //dibuja el texto en la pagina
        //x es el final del margen izquierdo y "y" es la altura de la página menos el marco superior
        //le pasa el tamaño de la fuente necesario y el tipo de fuente
        page.drawText(line, { x: margin, y: currentY, size: fontSize, font });
        //actualiza currentY restandole el tamaño de la fuente de la Linea por el interlineado
        currentY -= fontSize * lineSpacing;
    });

    const pdfBytes = await pdfDoc.save();
    await fs.writeFile(`${data.nroSiniestro}.pdf`, pdfBytes);
    return 0;
};

export default pdfManager;
