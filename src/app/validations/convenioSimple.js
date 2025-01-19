import z from 'zod';

const convenioSimpleValidation = z.object({
    nroSiniestro: z.string()
        .min(1, { message: "El numero de siniestro no puede estar vacio." })
        .regex(/^\d+$/, { message: "El numero de siniestro debe contener solamente numeros." })
        .max(10, { message: "El numero de siniestro debe tener hasta 10 digitos." }),
    fechaSiniestro: z.string()
        .min(1, { message: "La fecha de siniestro no puede estar vacia." })
        .regex(/^\d{2}\/\d{2}\/\d{2}$/, { message: "La fecha debe tener el formato dd/mm/aa." })
        .max(8, { message: "La fecha de siniestro debe tener hasta 6 digitos." }),
    lugarSiniestro: z.string()
        .min(1, { message: "El lugar del siniestro no puede estar vacio." })
        .max(40, { message: "El lugar del siniestro no puede superar los 40 caracteres." }),
    ciudadOcurrencia: z.string()
        .min(1, { message: "La ciudad de ocurrencia no puede estar vacia." })
        .max(40, { message: "La ciudad de ocurrencia no puede superar los 40 caracteres." }),
    provinciaOcurrencia: z.string()
        .min(1, { message: "La provincia de ocurrencia no puede estar vacia." })
        .max(40, { message: "La provincia de ocurrencia no puede superar los 40 caracteres." }),
    vehiculoAsegurado: z.string()
        .min(1, { message: "El vehiculo asegurado no puede estar vacio." })
        .max(40, { message: "El vehiculo asegurado no puede superar los 40 caracteres." }),
    patenteVehiculoAsegurado: z.string()
        .min(6, { message: "La patente del vehiculo asegurado no puede estar vacia." })
        .regex(/^[A-Z]{3}\d{3}$|^[A-Z]{2}\d{3}[A-Z]{2}$/i, {
            message: "La patente de asegurado debe tener el formato AAA111 o AA111AA.",
        })
        .max(7, { message: "La patente de asegurado debe tener hasta 7 digitos." }),
    conductorVehiculoAsegurado: z.string()
        .min(1, { message: "El conductor del vehiculo asegurado no puede estar vacio." })
        .max(40, { message: "El conductor asegurado no puede superar los 40 caracteres." }),
    dniConductorAsegurado: z.string()
        .min(1, { message: "El DNI del conductor asegurado no puede estar vacio." })
        .regex(/^\d{1,8}$/, { message: "El DNI del conductor asegurado debe tener hasta 8 digitos." })
        .max(8, { message: "El DNI de conductor de asegurado debe tener hasta 8 digitos." }),
    propietarioAsegurado: z.string()
        .min(1, { message: "El propietario asegurado no puede estar vacio." })
        .max(40, { message: "El propietario del vehiculo asegurado no puede superar los 40 caracteres." }),
    vehiculoTercero: z.string()
        .min(1, { message: "El vehiculo del tercero no puede estar vacio." })
        .max(40, { message: "El vehiculo tercero no puede superar los 40 caracteres." }),
    patente3ro: z.string()
        .min(6, { message: "La patente del tercero no puede estar vacia." })
        .regex(/^[A-Z]{3}\d{3}$|^[A-Z]{2}\d{3}[A-Z]{2}$/i, {
            message: "La patente de tercero debe tener el formato AAA111 o AA111AA.",
        })
        .max(7, { message: "La patente de tercero debe tener hasta 7 digitos." }),
    sumaIndemnizacion: z.string()
        .min(1, { message: "La suma de indemnizacion no puede estar vacia." })
        .regex(/^\d+$/, { message: "La suma de la indemnizacion debe contener solamente numeros." })
        .max(10, { message: "La suma de la indemnizacion no puede superar los 10 caracteres." }),
    sumaIndemnizacionTexto: z.string()
        .min(1, { message: "El texto de la suma de indemnizacion no puede estar vacio." })
        .max(80, { message: "El texto de lugar de la suma de la indemnizacion no puede superar los 80 caracteres." }),
})

export default convenioSimpleValidation;
