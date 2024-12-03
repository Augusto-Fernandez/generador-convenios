import { PDFDocument, StandardFonts } from "pdf-lib";
import fs from "fs/promises";
import convenioSimpleTemplate from "../templates/convenioSimple.js";
import { getLogoPath } from "../pathResolver.js";

class ConvenioSimpleManager {
    constructor(data){
        //ancho de una hoja tamaño carta
        this.pageWidth = 612;
        //alto de una hoja tamaño carta
        this.pageHeight = 792;
        this.margin = 28.35;
        this.lineSpacing = 1.75;
        //ancho máximo del texto
        //es el ancho de la pagina tamaño carta menos los dos margenes
        this.textMaxWidth = this.pageWidth - this.margin * 2;
        //es el alto de la pagina tamaño carta menos los dos margenes
        this.textMaxHeight = this.pageHeight - this.margin * 2;
        //pdf creado
        this.pdf;
        //pagina creada
        this.page;
        //trackea el punto "y" de la altura, se va achicando con la imagen, margen y linea de texto que se agrega
        this.currentTopMargin = this.pageHeight - this.margin;

        this.title = data.nroSiniestro;
        this.body = convenioSimpleTemplate(data);
        this.font
    }

    setPage = async () =>{
        this.pdf = await PDFDocument.create();
        this.page = this.pdf.addPage([this.pageWidth, this.pageHeight]);
    };

    setLogo = async () =>{
        const pngImageBytes = await fs.readFile(getLogoPath());
        const pngImage = await this.pdf.embedJpg(pngImageBytes);

        //dimensiones de la imagen en DPI
        const imageWidth = 30.07; // 1.06 cm en puntos
        const imageHeight = 44.21; // 1.56 cm en puntos
        //equivale a un margen entre la imagen y el titulo de 0.5cm en DPI
        const imgMargin = 14.175;

        //la posición x de la imagen es el ancho de la hoja tamaño carta menos el ancho de la imagen divido 2 para encontrar el punto medio
        const imageX = (this.pageWidth - imageWidth) / 2;
        //la posición y de la imagen es el alto de la hoja tamaño carta menos el alto de la imagen menos el margen entre la imagen y el texto
        const imageY = this.pageHeight - imageHeight - imgMargin;
        this.page.drawImage(pngImage, { x: imageX, y: imageY, width: imageWidth, height: imageHeight });

        //ahora establece currentTopMargin como la altura de la página menos el margen superior menos el tamaño y menos el margen entre la imagen y el texto
        this.currentTopMargin = imageY - imgMargin;
    };

    setTitle = async () =>{
        const title = `ACUERDO CONCILIATORIO - DESISTIMIENTO DE ACCIONES – SINIESTRO N° ${this.title}`
        const titleFont = await this.pdf.embedFont(StandardFonts.HelveticaBold);
        const titleFontSize = 9;
        const titleWidth = titleFont.widthOfTextAtSize(title, titleFontSize);
        //hace divido 2 para que esté centrado
        const titleX = (this.pageWidth - titleWidth) / 2;
        //equivale a un margen entre el titulo y el texto de 0.5cm en DPI
        const titleMargin = 14.175;

        this.page.drawText(title, { 
            x: titleX, 
            y: this.currentTopMargin, 
            size: titleFontSize, 
            font: titleFont 
        });

        //mueve currentTopMargin abajo del margen de title
        this.currentTopMargin -= titleFontSize + titleMargin;
    };

    //Se encarga en dividir el texto en lineas que estén dentro del textMaxWidth
    //devuelve un array que contiene subarray que tienen el string del ancho del textMaxWidth
    splitTextIntoLines = async (fontSize) => {
        this.font = await this.pdf.embedFont(StandardFonts.Helvetica);
        const rawLines = this.body.split(/\r?\n/);
        //divide el texto en lineas de acuerdo a los saltos de lineas
        /*Ej:
            Línea uno con texto.
            Línea dos.

            queda:
            rawLines = ["Línea uno con texto.", "Línea dos."];
        */
        const formattedLines = [];

        //itera por cada linea
        rawLines.forEach((rawLine, index) => {
            //con trim() saca los espacios en blanco del principio y final de rawLine
            //si rawLine es una linea vacia
            if (rawLine.trim() === "") {
                //pushea una linea vacia
                formattedLines.push("");
                //corta ejecución
                return;
            }

            //divide en cada rawline en un array de palabras individuales borrando los espacios
            const words = rawLine.split(" ");
            //va a guardar la linea de texto ajustada
            let currentLine = "";

            //itera por cada palabra
            words.forEach((word) => {
                //almacena la linea de texto provisoria va a evaluar después
                let testLine

                //"" es falsy por lo que si no hay un linea, le agrega el primer word del array
                if(currentLine){
                    testLine = `${currentLine} ${word}`
                }else{
                    testLine = word
                }

                //calcula el ancho de testLine
                //widthOfTextAtSize es un método de pdf-lib que calcula el ancho de una linea de acuerdo a un string y int basado en el tamaño de la fuente
                const testLineWidth = this.font.widthOfTextAtSize(testLine, fontSize);
                //si el ancho de testLine es mayor al ancho máximo del texto
                if (testLineWidth > this.textMaxWidth) {
                    //pushea la currentLine (no testLine) a la array de lineas formateadas
                    formattedLines.push(currentLine);
                    //hace una nueva currentLine que empieza como la palabra que se está evaluando
                    currentLine = word;
                } else {
                    //si el ancho de testLine no es mayor al ancho máximo del texto
                    //hace que currentLine sea testLine
                    currentLine = testLine;
                }
            });

            //si ya recorrió las palabras y currentLine no es un string vacio, lo pushea al array de las lineas formateadas
            if(currentLine){
                formattedLines.push(currentLine);
            }

            //antes de pasar a la siguiente linea
            //se fija que la posición donde se está sea dentro del rango del array de lineas
            //agrega un linea vacia al final de cada parrafo
            if (index < rawLines.length - 1) {
                formattedLines.push("");
            }
        });

        //devuelve el array de las lineas formateadas
        return formattedLines;
    }

    //devuelve un objeto con la linea que se le pasa y la propiedad spacings que 
    //tiene los espacios que hacen falta para justificar la linea
    justifyLine = (line, fontSize) => {
        //si la linea termina en un salto de linea, devuelve un array vacío para que
        //no se justifique la última linea del parrafo
        if (line.endsWith(".\n")) {
            return { line, spacings: [] };
        }

        //hace una array de palabras
        const words = line.split(" ");

        //suma el tamaño de cada palabra que la calcula con widthOfTextAtSize
        const textWidth = words.reduce((widthAccumulator, word) => {
            return widthAccumulator + this.font.widthOfTextAtSize(word, fontSize);
        }, 0);

        //calcula el espacio restante haciendo el ancho maximo del texto menos el ancho total de las palabras de la linea
        const remainingSpace = this.textMaxWidth - textWidth;
        //cuenta la cantidad de espacios que hay tomando el length de words - 1 dado que la primera palabra no tiene un espacio anterior
        const spaceCount = words.length - 1; // Espacios entre palabras
        
        //el espacio extra para justificar es el espacio sobrante dividido entra la cantidad de espacios
        const extraSpacing = remainingSpace / spaceCount;

        //devuelve la linea que se le pasó
        //devuelve spacings que son los espacios exactos para justificar las lineas
        //hace un array del tamaño de los espacios que hay en la linea
        //y la llena con el valor numerico del espacio agrandado que hace falta para justificar la linea
        //este valor después va a ser usardo como punto x cuando se escriba el texto
        return { line, spacings: Array(spaceCount).fill(extraSpacing) };
    };

    //calcula el tamaño máximo de la fuente para que entre dentro de una página
    calculateFontSize = async () => {  
        let fontSize = 7;

        //se usa while porque va a probar cual tamaño de fuente corresponde
        //con cada iteración, baja el tamaño de la fuente
        while (fontSize > 1) {
            //divide al texto en lineas que usan el tamaño de la fuente
            const lines = await this.splitTextIntoLines(fontSize);
            //establece la altura del texto como la cantidad de lineas por la multiplicación del tamaño de la fuente y el interlineado
            const textHeight = lines.length * (fontSize * this.lineSpacing);
            //si la altura del texto es menor o igual a la altura máxima de la pagina
            if (textHeight <= this.textMaxHeight) {
                //corta la ejecución del while
                break;
            }
            //si la altura del texto es mayor a la altura máxima del texto, baja 0.5 el tamaño de la fuente y ejecute otra vez el bucle
            fontSize -= 0.5;
        }

        return fontSize;
    };

    setBody = async () =>{
        //calcula el tamaño de la fuente
        const fontSize = await this.calculateFontSize();
        //divide el texto en lineas de acuerdo al tamaño de fuente que corresponde
        const lines = await this.splitTextIntoLines(fontSize);

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
    
            //con trim() saca los espacios en blanco del principio y final de la linea
            //si line es una linea vacia
            if (line.trim() === "") {
                //hace un espacio entre vacio entre los parrafos
                //el cual va a ser de la mitad del tamaño de la fuente por el interlineado
                this.currentTopMargin -= (fontSize / 2) * this.lineSpacing;
                //corta el la iteración del for con la linea y pasa a la próxima
                continue;
            }
    
            //valida si el margen superior está sobre el inferior
            if (this.currentTopMargin < this.margin) {
                //si el margen superior está por debajo del inferior
                //reinicia la altura del margen superior
                this.currentTopMargin = this.pageHeight - this.margin;
                //crea una nueva pagina
                this.page = this.pdf.addPage([this.pageWidth, this.pageHeight]);
            }
    
            //determinar si el la última linea el parrafo
            let isLastLineOfParagraph = false;

            //si la posición del bucle es mayor a la cantida de lineas que hay
            //o si la linea siguiente a la que se está ahora es una linea vacía
            if(i === lines.length - 1 || lines[i + 1].trim() === ""){
                isLastLineOfParagraph = true;
            };
    
            //escribe el texto sin justificar
            if (isLastLineOfParagraph) {
                //establece como principio de la linea el margen izquierdo
                let x = this.margin;
                //divide la linea en un array de palabras sin espacios
                const words = line.split(" ");
                words.forEach((word) => {
                    //escribre la palabra
                    this.page.drawText(word, { x, y: this.currentTopMargin, size: fontSize, font: this.font });
                    //mueve x hacía la derecha, la distancia es el ancho de la palabra que escribió mas un espacio común
                    //de esta forma la próxima palabra se escribe después del espacio que sigue a la palabra anterior
                    x += this.font.widthOfTextAtSize(word, fontSize) + this.font.widthOfTextAtSize(" ", fontSize);
                });
            //justifica el texto
            } else {
                //obtiene los espacios para que la linea esté justificada
                const { spacings } = this.justifyLine(line, fontSize);
                //divide la linea en un array de palabras sin espacios
                const words = line.split(" ");
                //establece como principio de la linea el margen izquierdo
                let x = this.margin;
    
                words.forEach((word, index) => {
                    //escribre la palabra
                    this.page.drawText(word, { x, y: this.currentTopMargin, size: fontSize, font: this.font });
                    //mueve x a la derecha haciendo un espacio normal
                    x += this.font.widthOfTextAtSize(word, fontSize);
    
                    //si el index es menor al tamaño del array de espacios
                    if (index < spacings.length) {
                        //agrega el espacio extra correspondiente al indice de la palabra donse se está
                        x += spacings[index];
                    }
                });
            }
    
            //actualiza currentY restandole el tamaño de la fuente de la Linea por el interlineado
            this.currentTopMargin -= fontSize * this.lineSpacing;
        }
    };

    createPdf = async () =>{
        await this.setPage();
        await this.setLogo();
        await this.setTitle();
        await this.setBody();

        const pdfBytes = await this.pdf.save();
        await fs.writeFile(`${this.title}.pdf`, pdfBytes);
        return 0;
    };
};

export default ConvenioSimpleManager;
