import { useForm } from "react-hook-form"
import { useState } from "react";

const ConvenioSimple = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [formSubmited,setFormSubmited] = useState(false)
    const [getData,setGetData] = useState("no data")

    const onSubmit = async (data) => {
        setGetData(`${data.nroSiniestro}`)
        setFormSubmited(true);
    };

    return (
        <div>
            {
                formSubmited && (
                    <p>{getData}</p>
                )
            }
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
                            required: {
                                value: true,
                                message: "Nombre de Tercero Propietario es requerido",
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
                        })}
                    />
                </div>
                {errors.ciudadOcurrencia && typeof errors.ciudadOcurrencia.message === 'string' && (
                    <span className="text-red-500">{errors.ciudadOcurrencia.message}</span>
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
                                message: "Patente de Vehículo Terceroes requerida",
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
                            required: {
                                value: true,
                                message: "Conductor de Vehículo Tercero es requerido",
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
                        })}
                    />
                </div>
                {errors.sumaIndemnizacion && typeof errors.sumaIndemnizacion.message === 'string' && (
                    <span className="text-red-500">{errors.sumaIndemnizacion.message}</span>
                )}
                <button type="submit">Generar Convenio</button>
            </form>
        </div>
    )
}

export default ConvenioSimple;
