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
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Número de Siniestro</label>
                <input 
                    type="text"
                    {...register("nroSiniestro", {
                        required: {
                            value: true,
                            message: "Número de siniestro es requerido",
                        },
                    })}
                />
                {errors.nroSiniestro && typeof errors.nroSiniestro.message === 'string' && (
                    <span>
                        {errors.nroSiniestro.message}
                    </span>
                )}
                <label>Nombre de Tercero Propietario</label>
                <input 
                    type="text"
                    {...register("nombre3roPropietario", {
                        required: {
                            value: true,
                            message: "Nombre de Tercero Propietario es requerido",
                        },
                    })}
                />
                {errors.nombre3roPropietario && typeof errors.nombre3roPropietario.message === 'string' && (
                    <span>
                        {errors.nombre3roPropietario.message}
                    </span>
                )}
                <label>Fecha de Siniestro</label>
                <input 
                    type="text" 
                    placeholder="dd/mm/aa"
                    {...register("fechaSiniestro", {
                        required: {
                            value: true,
                            message: "Fecha de Siniestro es requerido",
                        },
                    })}
                />
                {errors.fechaSiniestro && typeof errors.fechaSiniestro.message === 'string' && (
                    <span>
                        {errors.fechaSiniestro.message}
                    </span>
                )}
                <label>Lugar del Siniestro</label>
                <input 
                    type="text"
                    {...register("lugarSiniestro", {
                        required: {
                            value: true,
                            message: "Lugar del Siniestro es requerido",
                        },
                    })}
                />
                {errors.lugarSiniestro && typeof errors.lugarSiniestro.message === 'string' && (
                    <span>
                        {errors.lugarSiniestro.message}
                    </span>
                )}
                <label>Ciudad de Ocurrencia</label>
                <input 
                    type="text"
                    {...register("ciudadOcurrencia", {
                        required: {
                            value: true,
                            message: "Ciudad de Ocurrencia es requerida",
                        },
                    })}
                />
                {errors.ciudadOcurrencia && typeof errors.ciudadOcurrencia.message === 'string' && (
                    <span>
                        {errors.ciudadOcurrencia.message}
                    </span>
                )}
                <label>Vehículo Asegurado</label>
                <input 
                    type="text"
                    {...register("vehiculoAsegurado", {
                        required: {
                            value: true,
                            message: "Vehículo Asegurado es requerido",
                        },
                    })}
                />
                {errors.vehiculoAsegurado && typeof errors.vehiculoAsegurado.message === 'string' && (
                    <span>
                        {errors.vehiculoAsegurado.message}
                    </span>
                )}
                <label>Patente de Vehículo Asegurado</label>
                <input 
                    type="text"
                    {...register("patenteVehiculoAsegurado", {
                        required: {
                            value: true,
                            message: "Patente de Vehículo Asegurado es requerida",
                        },
                    })}
                />
                {errors.patenteVehiculoAsegurado && typeof errors.patenteVehiculoAsegurado.message === 'string' && (
                    <span>
                        {errors.patenteVehiculoAsegurado.message}
                    </span>
                )}
                <label>Conductor de Vehículo Asegurado</label>
                <input 
                    type="text"
                    {...register("conductorVehiculoAsegurado", {
                        required: {
                            value: true,
                            message: "Conductor de Vehículo Asegurado es requerido",
                        },
                    })}
                />
                {errors.conductorVehiculoAsegurado && typeof errors.conductorVehiculoAsegurado.message === 'string' && (
                    <span>
                        {errors.conductorVehiculoAsegurado.message}
                    </span>
                )}
                <label>DNI de Conductor de Vehículo Asegurado</label>
                <input 
                    type="text"
                    {...register("dniConductorAsegurado", {
                        required: {
                            value: true,
                            message: "DNI de Conductor de Vehículo Asegurado es requerido",
                        },
                    })}
                />
                {errors.dniConductorAsegurado && typeof errors.dniConductorAsegurado.message === 'string' && (
                    <span>
                        {errors.dniConductorAsegurado.message}
                    </span>
                )}
                <label>Propietario de Vehículo Asegurado</label>
                <input 
                    type="text"
                    {...register("propietarioAsegurado", {
                        required: {
                            value: true,
                            message: "Propietario de Vehículo Asegurado es requerido",
                        },
                    })}
                />
                {errors.propietarioAsegurado && typeof errors.propietarioAsegurado.message === 'string' && (
                    <span>
                        {errors.propietarioAsegurado.message}
                    </span>
                )}
                <label>Vehículo Tercero</label>
                <input 
                    type="text"
                    {...register("vehiculoTercero", {
                        required: {
                            value: true,
                            message: "Vehículo Tercero es requerido",
                        },
                    })}
                />
                {errors.vehiculoTercero && typeof errors.vehiculoTercero.message === 'string' && (
                    <span>
                        {errors.vehiculoTercero.message}
                    </span>
                )}
                <label>Patente de Vehículo Tercero</label>
                <input 
                    type="text"
                    {...register("patente3ro", {
                        required: {
                            value: true,
                            message: "Patente de Vehículo Terceroes requerida",
                        },
                    })}
                />
                {errors.patente3ro && typeof errors.patente3ro.message === 'string' && (
                    <span>
                        {errors.patente3ro.message}
                    </span>
                )}
                <label>Conductor de Vehículo Tercero</label>
                <input 
                    type="text"
                    {...register("conductor3ro", {
                        required: {
                            value: true,
                            message: "Conductor de Vehículo Tercero es requerido",
                        },
                    })}
                />
                {errors.conductor3ro && typeof errors.conductor3ro.message === 'string' && (
                    <span>
                        {errors.conductor3ro.message}
                    </span>
                )}
                <label>Suma a Indemnizar</label>
                <input 
                    type="number"
                    {...register("sumaIndemnizacion", {
                        required: {
                            value: true,
                            message: "Suma a indemnizar es requerida",
                        },
                    })}
                />
                {errors.sumaIndemnizacion && typeof errors.sumaIndemnizacion.message === 'string' && (
                    <span>
                        {errors.sumaIndemnizacion.message}
                    </span>
                )}
                <button type="submit">Generar Convenio</button>
            </form>
        </div>
    )
}

export default ConvenioSimple;
