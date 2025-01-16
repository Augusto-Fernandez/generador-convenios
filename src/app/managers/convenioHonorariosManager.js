import fs from "fs/promises";
import { PDFDocument, StandardFonts } from "pdf-lib";

import { convenioHonorariosTemplate, lastPage } from "../templates/convenioHonorarios.js";
import { getLogoPath } from "../pathResolver.js";

class ConvenioHonorariosManager {
    constructor(data){
        //ancho de una hoja tamaño carta
        this.pageWidth = 612;
        //alto de una hoja tamaño carta
        this.pageHeight = 792;
        this.margin = 80;
        this.lineSpacing = 1.25;
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
        this.body = convenioHonorariosTemplate(data);
        this.font;
        this.boldFont;
        this.fontSize = 10;
    }

    setPage = async () =>{
        this.pdf = await PDFDocument.create();
        this.page = this.pdf.addPage([this.pageWidth, this.pageHeight]);
    };

    setLogo = async () =>{
        const imageBytes = await fs.readFile(getLogoPath());
        const image = await this.pdf.embedJpg(imageBytes);

        //dimensiones de la imagen en DPI
        const imageWidth = 30.07; // 1.06 cm en puntos
        const imageHeight = 44.21; // 1.56 cm en puntos
        //equivale a un margen entre la imagen y el titulo de 0.5cm en DPI
        const imgMargin = 14.175;

        //la posición x de la imagen es el ancho de la hoja tamaño carta menos el ancho de la imagen divido 2 para centrar la imagen
        const imageX = (this.pageWidth - imageWidth) / 2;
        //la posición y de la imagen es el alto de la hoja tamaño carta menos el margen superior
        const imageY = this.pageHeight - this.margin;
        this.page.drawImage(image, { x: imageX, y: imageY, width: imageWidth, height: imageHeight });

        //ahora establece currentTopMargin como la altura de la página menos el margen superior menos el tamaño de la imagen 
        // y menos el margen entre la imagen y el texto
        this.currentTopMargin = imageY - imgMargin;
    };

    setTitle = async () =>{
        const title = `ACUERDO CONCILIATORIO - DESISTIMIENTO DE ACCIONES – SINIESTRO ${this.title}`
        this.boldFont = await this.pdf.embedFont(StandardFonts.HelveticaBold);
        const titleWidth = this.boldFont.widthOfTextAtSize(title, this.fontSize);
        //hace divido 2 para que esté centrado
        const titleX = (this.pageWidth - titleWidth) / 2;
        //equivale a un margen entre el titulo y el texto de 0.5cm en DPI
        const titleMargin = 14.175;

        this.page.drawText(title, { 
            x: titleX, 
            y: this.currentTopMargin, 
            size: this.fontSize, 
            font: this.boldFont 
        });

        //mueve currentTopMargin abajo de title y del margen de title
        this.currentTopMargin -= this.fontSize + titleMargin;
    };

    //Se encarga en dividir el texto en lineas que estén dentro del textMaxWidth
    //devuelve un array que contiene strings del ancho del textMaxWidth
    //isLastPage valida si está en la última pagina para agregar las sangrías
    splitTextIntoLines = async (lines, isLastPage) => {
        this.font = await this.pdf.embedFont(StandardFonts.Helvetica);
        const rawLines = lines.split(/\r?\n/);
        //divide el texto en lineas de acuerdo a los saltos de lineas
        /*Ej:
            Línea uno con texto.
            Línea dos.

            queda:
            rawLines = ["Línea uno con texto.", "Línea dos."];
        */
        const formattedLines = [];

        //itera por cada linea (parrafo)
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

            //se fija si está en la última pagina y 
            //si es el primer parrafo y el de "Finalmente, manifiesto que ..."
            if((isLastPage && index === 0) || (isLastPage && index === 11)){
                words.unshift("        ");
            }

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
                const testLineWidth = this.font.widthOfTextAtSize(testLine, this.fontSize);
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
            //se fija que la posición donde se está no sea el último parrafo
            //agrega un linea vacia al final de cada parrafo
            //estos espacios en blanco los va a usar en setBody() y setLastPage() para hacer los espacios entre parrafos
            if (index < rawLines.length - 1) {
                formattedLines.push("");
            }
        });

        //devuelve el array de las lineas formateadas
        return formattedLines;
    }

    justifyLine = (line) => {
        //si la linea termina en un salto de linea, devuelve un array vacío para que
        //no se justifique la última linea del parrafo
        if (line.endsWith(".\n")) {
            return { line, spacings: [] };
        }

        //hace una array de palabras
        const words = line.split(" ");

        //suma el tamaño de cada palabra que la calcula con widthOfTextAtSize
        const textWidth = words.reduce((widthAccumulator, word) => {
            return widthAccumulator + this.font.widthOfTextAtSize(word, this.fontSize);
        }, 0);

        //calcula el espacio restante haciendo el ancho maximo del texto menos el ancho total de las palabras de la linea
        const remainingSpace = this.textMaxWidth - textWidth;
        //cuenta la cantidad de espacios que hay tomando el length de words - 1 dado que la primera palabra no tiene un espacio anterior
        const spaceCount = words.length - 1;
        
        //el espacio extra para justificar es el espacio sobrante dividido entra la cantidad de espacios
        const extraSpacing = remainingSpace / spaceCount;

        //devuelve la linea que se le pasó
        //devuelve spacings que son los espacios exactos para justificar las lineas
        //hace un array del tamaño de los espacios que hay en la linea
        //y la llena con el valor numerico del espacio agrandado que hace falta para justificar la linea
        //este valor después va a ser usardo como punto x cuando se escriba el texto
        return { line, spacings: Array(spaceCount).fill(extraSpacing) };
    };

    setBody = async () =>{
        //divide el texto en lineas de acuerdo al tamaño de fuente que corresponde
        const lines = await this.splitTextIntoLines(this.body, false);

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
    
            //con trim() saca los espacios en blanco del principio y final de la linea
            //si line es una linea vacia
            if (line.trim() === "") {
                //hace un espacio entre vacio entre los parrafos
                //el cual va a ser de la mitad del tamaño de la fuente por el interlineado
                this.currentTopMargin -= (this.fontSize / 2) * this.lineSpacing;
                //corta el la iteración del for con la linea y pasa a la próxima
                continue;
            }
    
            //valida si el margen superior está sobre el inferior
            if (this.currentTopMargin < this.margin) {
                //si el margen superior está por debajo del inferior
                //reinicia la altura del margen superior
                this.currentTopMargin = this.pageHeight - 28.35;
                //crea una nueva pagina
                this.page = this.pdf.addPage([this.pageWidth, this.pageHeight]);
            }
    
            //determinar si el la última linea el parrafo
            let isLastLineOfParagraph = false;

            //si la posición del bucle es igual a la posición de la última linea
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
                    this.page.drawText(word, { x, y: this.currentTopMargin, size: this.fontSize, font: this.font });
                    //mueve x hacía la derecha, la distancia es el ancho de la palabra que escribió mas un espacio común
                    //de esta forma la próxima palabra se escribe después del espacio que sigue a la palabra anterior
                    x += this.font.widthOfTextAtSize(word, this.fontSize) + this.font.widthOfTextAtSize(" ", this.fontSize);
                });
            //justifica el texto
            } else {
                //obtiene los espacios para que la linea esté justificada
                const { spacings } = this.justifyLine(line);
                //divide la linea en un array de palabras sin espacios
                const words = line.split(" ");
                //establece como principio de la linea el margen izquierdo
                let x = this.margin;
    
                words.forEach((word, index) => {
                    //escribre la palabra
                    this.page.drawText(word, { x, y: this.currentTopMargin, size: this.fontSize, font: this.font });
                    //mueve x a la derecha el espacio de la palabra que escribió
                    x += this.font.widthOfTextAtSize(word, this.fontSize);
    
                    //si el index es menor al tamaño del array de espacios
                    if (index < spacings.length) {
                        //agrega el espacio formateado correspondiente al indice de la palabra donse se está
                        x += spacings[index];
                    }
                });
            }
    
            //actualiza currentTopMargin restandole el tamaño de la fuente de la Linea por el interlineado
            //hace fontSize porque es el tamaño de la linea que escribió y lineSpacing es el porcentaje de distancia
            //entre la linea escrita y la próxima 
            this.currentTopMargin -= this.fontSize * this.lineSpacing;
        }
    };

    setLastPage = async () =>{
        //reinicia el margen en el principio de la nueva hoja
        this.currentTopMargin = this.pageHeight - this.margin;
        this.page = this.pdf.addPage([this.pageWidth, this.pageHeight]);

        this.page.drawText("FORMA DE PAGO", { 
            x: this.margin, 
            y: this.currentTopMargin, 
            size: this.fontSize, 
            font: this.boldFont 
        });

        this.currentTopMargin -= this.fontSize * this.lineSpacing;

        this.page.drawText("Transferencia Bancaria", { 
            x: this.margin, 
            y: this.currentTopMargin, 
            size: this.fontSize, 
            font: this.font 
        });

        this.currentTopMargin -= this.fontSize * this.lineSpacing * 2;

        this.page.drawText("SOLO PARA EL CASO DE TRANSFERENCIA BANCARIA", { 
            x: this.margin, 
            y: this.currentTopMargin, 
            size: this.fontSize, 
            font: this.boldFont  
        });

        this.currentTopMargin -= this.fontSize * this.lineSpacing * 2;

        const lines = await this.splitTextIntoLines(lastPage, true);

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
    
            //con trim() saca los espacios en blanco del principio y final de la linea
            //si line es una linea vacia
            if (line.trim() === "") {
                //hace un espacio entre vacio entre los parrafos
                //el cual va a ser de la mitad del tamaño de la fuente por el interlineado
                this.currentTopMargin -= (this.fontSize / 2) * this.lineSpacing;
                //corta el la iteración del for con la linea y pasa a la próxima
                continue;
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
                    this.page.drawText(word, { x, y: this.currentTopMargin, size: this.fontSize, font: this.font });
                    //mueve x hacía la derecha, la distancia es el ancho de la palabra que escribió mas un espacio común
                    //de esta forma la próxima palabra se escribe después del espacio que sigue a la palabra anterior
                    x += this.font.widthOfTextAtSize(word, this.fontSize) + this.font.widthOfTextAtSize(" ", this.fontSize);
                });
            //justifica el texto
            } else {
                //obtiene los espacios para que la linea esté justificada
                const { spacings } = this.justifyLine(line);
                //divide la linea en un array de palabras sin espacios
                const words = line.split(" ");
                //establece como principio de la linea el margen izquierdo
                let x = this.margin;
    
                words.forEach((word, index) => {
                    //escribre la palabra
                    this.page.drawText(word, { x, y: this.currentTopMargin, size: this.fontSize, font: this.font });
                    //mueve x a la derecha el espacio de la palabra que escribió
                    x += this.font.widthOfTextAtSize(word, this.fontSize);
    
                    //si el index es menor al tamaño del array de espacios
                    if (index < spacings.length) {
                        //agrega el espacio formateado correspondiente al indice de la palabra donse se está
                        x += spacings[index];
                    }
                });
            }
    
            //actualiza currentTopMargin restandole el tamaño de la fuente de la Linea por el interlineado
            //hace fontSize porque es el tamaño de la linea que escribió y lineSpacing es el porcentaje de distancia
            //entre la linea escrita y la próxima 
            this.currentTopMargin -= this.fontSize * this.lineSpacing;
        }
    };

    createPdf = async () =>{
        await this.setPage();
        await this.setLogo();
        await this.setTitle();
        await this.setBody();
        await this.setLastPage();

        const pdfBytes = await this.pdf.save();
        await fs.writeFile(`Convenio ${this.title}.pdf`, pdfBytes);
        return;
    };
};

export default ConvenioHonorariosManager;
