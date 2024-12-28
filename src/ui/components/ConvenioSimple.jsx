import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";

const ConvenioSimple = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try{
            window.api.convenioSimple(data);
        }catch(e){
            console.error('Error al generar el PDF:', e);
        }
    };

    return (
        <div>
            <button>
                <Link to="/">Volver</Link>
            </button>
            <form onSubmit={handleSubmit(onSubmit)} className="border border-black">
                <div>
                    <label>Número de Siniestro</label>
                    <input 
                        type="text"
                        className="border border-black"
                        {...register("nroSiniestro", {
                            required: {
                                value: true,
                                message: "Número de siniestro es requerido",
                            },
                            pattern: {
                                value: /^\d{1,10}$/,
                                message: "Debe ser un número de hasta 10 dígitos",
                            },
                            maxLength: {
                                value: 10,
                                message: "El número de siniestro no puede superar los 10 dígitos",
                            },
                        })}
                    />
                </div>
                {errors.nroSiniestro && typeof errors.nroSiniestro.message === 'string' && (
                    <span className="text-red-500">{errors.nroSiniestro.message}</span>
                )}
                <div>
                    <label>Nombre de Tercero Propietario</label>
                    <input 
                        type="text" 
                        className="border border-black"
                        {...register("nombre3roPropietario", {
                            maxLength: {
                                value: 40,
                                message: "Este campo no puede tener más de 40 caracteres",
                            },
                        })}
                    />
                </div>
                {errors.nombre3roPropietario && typeof errors.nombre3roPropietario.message === 'string' && (
                    <span className="text-red-500">{errors.nombre3roPropietario.message}</span>
                )}
                <div>
                    <label>Fecha de Siniestro</label>
                    <input 
                        type="text"
                        className="border border-black" 
                        placeholder="dd/mm/aa"
                        {...register("fechaSiniestro", {
                            required: {
                                value: true,
                                message: "Fecha de Siniestro es requerido",
                            },
                            pattern: {
                                value: /^\d{1,2}\/\d{1,2}\/\d{2}$/,
                                message: "La fecha debe estar en un formato dd/mm/aa",
                            },
                        })}
                    />
                </div>
                {errors.fechaSiniestro && typeof errors.fechaSiniestro.message === 'string' && (
                    <span className="text-red-500">{errors.fechaSiniestro.message}</span>
                )}
                <div>
                    <label>Lugar del Siniestro</label>
                    <input 
                        type="text"
                        className="border border-black"
                        {...register("lugarSiniestro", {
                            required: {
                                value: true,
                                message: "Lugar del Siniestro es requerido",
                            },
                            maxLength: {
                                value: 40,
                                message: "Este campo no puede tener más de 40 caracteres",
                            },
                        })}
                    />
                </div>
                {errors.lugarSiniestro && typeof errors.lugarSiniestro.message === 'string' && (
                    <span className="text-red-500">{errors.lugarSiniestro.message}</span>
                )}
                <div>
                    <label>Ciudad de Ocurrencia</label>
                    <input 
                        type="text"
                        className="border border-black"
                        {...register("ciudadOcurrencia", {
                            required: {
                                value: true,
                                message: "Ciudad de Ocurrencia es requerida",
                            },
                            maxLength: {
                                value: 40,
                                message: "Este campo no puede tener más de 40 caracteres",
                            },
                        })}
                    />
                </div>
                {errors.ciudadOcurrencia && typeof errors.ciudadOcurrencia.message === 'string' && (
                    <span className="text-red-500">{errors.ciudadOcurrencia.message}</span>
                )}
                <div>
                    <label>Provincia de Ocurrencia</label>
                    <input 
                        type="text"
                        className="border border-black"
                        {...register("provinciaOcurrencia", {
                            required: {
                                value: true,
                                message: "Provincia de Ocurrencia es requerida",
                            },
                            maxLength: {
                                value: 40,
                                message: "Este campo no puede tener más de 40 caracteres",
                            },
                        })}
                    />
                </div>
                {errors.provinciaOcurrencia && typeof errors.provinciaOcurrencia.message === 'string' && (
                    <span className="text-red-500">{errors.provinciaOcurrencia.message}</span>
                )}
                <div>
                    <label>Vehículo Asegurado</label>
                    <input 
                        type="text"
                        className="border border-black"
                        {...register("vehiculoAsegurado", {
                            required: {
                                value: true,
                                message: "Vehículo Asegurado es requerido",
                            },
                            maxLength: {
                                value: 40,
                                message: "Este campo no puede tener más de 40 caracteres",
                            },
                        })}
                    />
                </div>
                {errors.vehiculoAsegurado && typeof errors.vehiculoAsegurado.message === 'string' && (
                    <span className="text-red-500">{errors.vehiculoAsegurado.message}</span>
                )}
                <div>
                    <label>Patente de Vehículo Asegurado</label>
                    <input 
                        type="text"
                        className="border border-black"
                        {...register("patenteVehiculoAsegurado", {
                            required: {
                                value: true,
                                message: "Patente de Vehículo Asegurado es requerida",
                            },
                            pattern: {
                                value: /^[a-zA-Z]{3}\d{3}$|^[a-zA-Z]{2}\d{3}[a-zA-Z]{2}$/,
                                message: "La patente debe tener un formato válido: ABC123 o AB123CD",
                            },
                        })}
                    />
                </div>
                {errors.patenteVehiculoAsegurado && typeof errors.patenteVehiculoAsegurado.message === 'string' && (
                    <span className="text-red-500">{errors.patenteVehiculoAsegurado.message}</span>
                )}
                <div>
                    <label>Conductor de Vehículo Asegurado</label>
                    <input 
                        type="text"
                        className="border border-black"
                        {...register("conductorVehiculoAsegurado", {
                            required: {
                                value: true,
                                message: "Conductor de Vehículo Asegurado es requerido",
                            },
                            maxLength: {
                                value: 40,
                                message: "Este campo no puede tener más de 40 caracteres",
                            },
                        })}
                    />
                </div>
                {errors.conductorVehiculoAsegurado && typeof errors.conductorVehiculoAsegurado.message === 'string' && (
                    <span className="text-red-500">{errors.conductorVehiculoAsegurado.message}</span>
                )}
                <div>
                    <label>DNI de Conductor de Vehículo Asegurado</label>
                    <input 
                        type="text"
                        className="border border-black"
                        {...register("dniConductorAsegurado", {
                            required: {
                                value: true,
                                message: "DNI de Conductor de Vehículo Asegurado es requerido",
                            },
                            pattern: {
                                value: /^\d{1,8}$/,
                                message: "El DNI debe tener hasta ocho dígitos",
                            },
                        })}
                    />
                </div>
                {errors.dniConductorAsegurado && typeof errors.dniConductorAsegurado.message === 'string' && (
                    <span className="text-red-500">{errors.dniConductorAsegurado.message}</span>
                )}
                <div>
                    <label>Propietario de Vehículo Asegurado</label>
                    <input 
                        type="text"
                        className="border border-black"
                        {...register("propietarioAsegurado", {
                            required: {
                                value: true,
                                message: "Propietario de Vehículo Asegurado es requerido",
                            },
                            maxLength: {
                                value: 40,
                                message: "Este campo no puede tener más de 40 caracteres",
                            },
                        })}
                    />
                </div>
                {errors.propietarioAsegurado && typeof errors.propietarioAsegurado.message === 'string' && (
                    <span className="text-red-500">{errors.propietarioAsegurado.message}</span>
                )}
                <div>
                    <label>Vehículo Tercero</label>
                    <input 
                        type="text"
                        className="border border-black"
                        {...register("vehiculoTercero", {
                            required: {
                                value: true,
                                message: "Vehículo Tercero es requerido",
                            },
                            maxLength: {
                                value: 40,
                                message: "Este campo no puede tener más de 40 caracteres",
                            },
                        })}
                    />
                </div>
                {errors.vehiculoTercero && typeof errors.vehiculoTercero.message === 'string' && (
                    <span className="text-red-500">{errors.vehiculoTercero.message}</span>
                )}
                <div>
                    <label>Patente de Vehículo Tercero</label>
                    <input 
                        type="text"
                        className="border border-black"
                        {...register("patente3ro", {
                            required: {
                                value: true,
                                message: "Patente de Vehículo Tercero es requerida",
                            },
                            pattern: {
                                value: /^[a-zA-Z]{3}\d{3}$|^[a-zA-Z]{2}\d{3}[a-zA-Z]{2}$/,
                                message: "La patente debe tener un formato válido: ABC123 o AB123CD",
                            },
                        })}
                    />
                </div>
                {errors.patente3ro && typeof errors.patente3ro.message === 'string' && (
                    <span className="text-red-500">{errors.patente3ro.message}</span>
                )}
                <div>
                    <label>Conductor de Vehículo Tercero</label>
                    <input 
                        type="text"
                        className="border border-black"
                        {...register("conductor3ro", {
                            maxLength: {
                                value: 40,
                                message: "Este campo no puede tener más de 40 caracteres",
                            },
                        })}
                    />
                </div>
                {errors.conductor3ro && typeof errors.conductor3ro.message === 'string' && (
                    <span className="text-red-500">{errors.conductor3ro.message}</span>
                )}
                <div>
                    <label>Suma a Indemnizar</label>
                    <input 
                        type="number"
                        className="border border-black"
                        {...register("sumaIndemnizacion", {
                            required: {
                                value: true,
                                message: "Suma a indemnizar es requerida",
                            },
                            maxLength: {
                                value: 10,
                                message: "Este campo no puede tener más de 10 caracteres",
                            },
                        })}
                    />
                </div>
                {errors.sumaIndemnizacion && typeof errors.sumaIndemnizacion.message === 'string' && (
                    <span className="text-red-500">{errors.sumaIndemnizacion.message}</span>
                )}
                <div>
                    <label>Texto de Suma a Indemnizar</label>
                    <input 
                        type="text"
                        className="border border-black"
                        {...register("sumaIndemnizacionTexto", {
                            required: {
                                value: true,
                                message: "Texto de suma a indemnizar es requerida",
                            },
                            maxLength: {
                                value: 80,
                                message: "Este campo no puede tener más de 80 caracteres",
                            },
                        })}
                    />
                </div>
                {errors.sumaIndemnizacionTexto && typeof errors.sumaIndemnizacionTexto.message === 'string' && (
                    <span className="text-red-500">{errors.sumaIndemnizacionTexto.message}</span>
                )}
                <div>
                    <button type="submit">Generar Convenio</button>
                </div>
            </form>
        </div>
    )
}

export default ConvenioSimple;
