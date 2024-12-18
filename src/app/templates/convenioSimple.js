import dotenv from "dotenv";
dotenv.config();

export const convenioSimpleTemplate = (data) => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("es-ES", { month: "long" });
    const year = today.getFullYear();

    const emptyField = "………………………………………";

    return `Entre el/la Sr./Sra. ${data.nombre3roPropietario ? data.nombre3roPropietario.toUpperCase() : emptyField} DNI/LC/LE N° ……………. con domicilio en ${emptyField}, de ${emptyField}, provincia de ${emptyField}, en adelante “La Reclamante”, por un lado, y el Dr. ${process.env.ABOGADO} en representación de ${process.env.COMPANIA}, con domicilio legal en calle ${process.env.DIRECCION_COMPANIA}, en adelante “La Aseguradora” por el otro, convienen celebrar el presente acuerdo conciliatorio y de desistimiento de acciones, sujeto a las cláusulas que a continuación se detallan:  
    PRIMERA: El día ${data.fechaSiniestro.toUpperCase()} ocurrió un siniestro de tránsito en inmediaciones de ${data.lugarSiniestro.toUpperCase()}, ${data.ciudadOcurrencia.toUpperCase()}, ${data.provinciaOcurrencia.toUpperCase()}, en el que intervino el vehículo asegurado en ${process.env.COMPANIA} marca y modelo ${data.vehiculoAsegurado.toUpperCase()} dominio ${data.patenteVehiculoAsegurado.toUpperCase()} conducido en esa ocasión por ${data.conductorVehiculoAsegurado.toUpperCase()} DNI ${data.dniConductorAsegurado.toUpperCase()} propiedad de ${data.propietarioAsegurado.toUpperCase()} y el rodado marca y modelo ${data.vehiculoTercero.toUpperCase()}  dominio ${data.patente3ro.toUpperCase()}  conducido en esa ocasión ${data.conductor3ro ? data.conductor3ro.toUpperCase() : emptyField} y propiedad de ${data.nombre3roPropietario ? data.nombre3roPropietario.toUpperCase() : emptyField}.
    SEGUNDA: Producto del evento referido resultó con daños materiales la unidad del Reclamante; a consecuencia de ello y por los daños y perjuicios sufridos, “La Reclamante” interpuso formal reclamo extrajudicial pretendiendo ser indemnizada por los mismos en el siniestro que nos ocupa. 
    TERCERA: Considerando los antecedentes particulares del siniestro de marras, La Reclamante expresa formalmente su pretensión resarcitoria a ${process.env.COMPANIA}, por la suma de ${data.sumaIndemnizacionTexto.toUpperCase()} ($${data.sumaIndemnizacion.toUpperCase()}.-) por la REPARACIÓN PLENA E INTEGRAL DE LOS DAÑOS Y PERJUICIOS SUFRIDOS, que abarca todo rubro y/o concepto que pudiere corresponder en sentido estricto y en sentido amplio en los términos del Código Civil y Comercial de la Nación: daños en el vehículo.su privación de uso y desvalorización venal, daño extrapatrimonial, daño no patrimonial en sentido amplio, daño patrimonial en sentido amplio, daño directo o indirecto, daño actual, daño futuro, daño material emergente, salarios caídos, lucro cesante, gastos de todo tipo, daño compensatorio, daño moratorio,  intereses, honorarios y aportes profesionales, etc.;  que pueda serle reclamado a ${process.env.COMPANIA} en virtud de la obligación de garantía asumida en los términos y dentro de los límites de la cobertura de la Póliza de Responsabilidad Civil contratada por su asegurado,  y/o al conductor al momento del hecho, proponiendo a “La Aseguradora” transar libremente el presente asunto sin que ello signifique reconocimiento de hechos, derechos, ni de responsabilidad civil o penal de parte de ésta ni de su asegurado (formalizándose al solo efecto conciliatorio y para evitar la acción civil por daños y perjuicios), no existiendo vicios de ninguna índole que afecten la plena validez del acto que se otorga.
    CUARTA: La Aseguradora acepta la pretensión por la suma de Pesos y los conceptos establecidos en la Cláusula Tercera, que abarcan capital indemnizatorio, actualizaciones e intereses y gastos, siendo las costas por su orden, a liquidar mediante Cheque/transferencia según datos obrantes al pie del presente acuerdo,  en el plazo máximo de veinte días desde la firma  del presente Acuerdo, que ostenta el carácter de formal y suficiente Carta de Pago cancelatoria y definitiva.
    QUINTA: Deja constancia "La Reclamante" que el pago acordado es liberatorio de todos los conceptos que se pudieren pretender por el accidente de marras y que fueron objeto del reclamo detallado. Asimismo manifiestan que nada más tienen que peticionar al asegurado ${data.propietarioAsegurado.toUpperCase()} de a ${process.env.COMPANIA}, quedando los nombrados total, definitiva e irrevocablemente liberados de cualquier obligación emergente del siniestro aludido, renunciando además “La Reclamante” a cualquier acción extrajudicial y/o judicial, civil y/o penal, iniciada o a iniciar contra aquéllos, considerándose definitiva y totalmente indemnizada. La Reclamante declara ser la única persona con derecho a peticionar resarcimiento por los daños y perjuicios sufridos, no existiendo terceras personas físicas ni jurídicas, como tampoco instituciones de ninguna índole, que puedan reclamar con origen en este accidente, siendo la indemnización recibida integral, única y definitiva. Manifiesta además que no ha recibido prestación alguna otorgada por Aseguradoras de riesgos del Trabajo por el siniestro que nos ocupa. El presente acuerdo podrá presentarse en las Actuaciones Penales del Ministerio Público de la Acusación a los fines de solicitar al mismo que desestime de la acción penal promovida si existiera, toda vez que en la presente conciliación se desiste de las acciones por los daños y perjuicios sufridos y manifiesta La Reclamante su desinterés en la persecución penal del Sr. de de ${data.propietarioAsegurado.toUpperCase()}.
    SEXTA: En caso de incumplimiento del presente, las partes acuerdan libremente la jurisdicción de los tribunales ordinarios con competencia en la ciudad de ${process.env.CIUDAD} Provincia de ${process.env.PROVINCIA}, renunciando desde ya a cualquier otro fuero y/o jurisdicción que pudiere corresponder, inclusive el Federal. Los domicilios más arriba denunciados se tendrán como válidos para cualquier notificación extrajudicial y/o judicial que sea cursada por las partes.
    Previa lectura y ratificación del contenido del presente, se firman de plena conformidad dos ejemplares de un mismo tenor y a un solo efecto, en la ciudad de ${process.env.CIUDAD} Provincia de ${process.env.PROVINCIA}, a los ${day} días del mes de ${month} de ${year}.
    "El presente documento es ORIGINAL y se remite en archivo digital a su destinataria ${process.env.COMPANIA} en virtud de las circunstancias extraordinarias y Fuerza Mayor según las medidas dispuestas en la República Argentina s/D.N.U. de fecha 19/03/2020. Declaro/amos bajo juramento el archivo digital que se remite desde la casilla de correo ".........................................@.................................." ES INSTRUMENTO ORIGINAL a todos los efectos legales, de conformidad a lo dispuesto por los Arts. 284, 286, ssgts y ccs del Código Civil y Comercial de la Nación".


    Firma:………………………………………………


    Aclaración:………………………………………………


    DNI:………………………………………………


    CUIL – CUIT ………………………………………………`.replace(/\r/g, "");//saca el retorno de carro
};

export const lastPage = `Manifiesto expresamente mi voluntad de recibir el importe de la indemnización a través del SISTEMA DE CRÉDITO AUTOMÁTICO EN CUENTA BANCARIA. En virtud de lo expuesto, solicito a ${process.env.COMPANIA} que en la fecha que disponga, acredite los fondos en la cuenta que a continuación se individualiza:

Datos Bancarios
Banco: Sucursal:.......................................................................................
Cuenta corriente No:.......................................................................................................................................................
Caja de Ahorro No:.......................................................................................................................................................
C.B.U.:.......................................................................................................................................................
1oTitular:.......................................................................................................................................................
2o Titular:.......................................................................................................................................................
Dirección de e- mail:.........................................................................................................................................

Finalmente, manifiesto que, una vez que ${process.env.COMPANIA} efectúe la transferencia correspondiente a la cuenta antes identificada, la misma tendrá carácter cancelatorio respecto de las obligaciones emergentes del presente acuerdo transaccional, liberando a ${process.env.COMPANIA}, además, de toda responsabilidad y/u obligación por la pérdida y/o disminución de dicha transferencia y/o la imposibilidad de extraer las sumas que se acrediten en la referida cuenta.

Firma:.........................................................
Aclaración:...................................................
Lugar y Fecha:..............................................`.replace(/\r/g, "");//saca el retorno de carro
