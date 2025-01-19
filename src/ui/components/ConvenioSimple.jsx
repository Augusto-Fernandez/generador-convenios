import { useForm } from "react-hook-form"
import { useState } from "react";

import Header from "./Header.jsx";

const ConvenioSimple = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);

        try{
            await window.api.convenioSimple(data);
            setIsLoading(false);
        }catch(e){
            console.error('Error en onSubmit:', e);
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header title={"Convenio Simple"}/>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-2 flex flex-col items-center justify-center">
                <div className="mb-6 h-12 w-2/3">
                    <div className="flex justify-between">
                        <label className="text-sm">Número de Siniestro</label>
                        <input 
                            type="text"
                            className="h-6 border border-gray-500 rounded"
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
                        <span className="text-red-500 text-xs">{errors.nroSiniestro.message}</span>
                    )}
                </div>
                <div className="mb-6 h-12 w-2/3">
                    <div className="flex justify-between">
                        <label className="text-sm">Nombre de Tercero Propietario</label>
                        <input 
                            type="text" 
                            className="h-6 border border-gray-500 rounded"
                            {...register("nombre3roPropietario", {
                                maxLength: {
                                    value: 40,
                                    message: "Este campo no puede tener más de 40 caracteres",
                                },
                            })}
                        />
                    </div>
                    {errors.nombre3roPropietario && typeof errors.nombre3roPropietario.message === 'string' && (
                        <span className="text-red-500 text-xs">{errors.nombre3roPropietario.message}</span>
                    )}
                </div>
                <div className="mb-6 h-12 w-2/3">
                    <div className="flex justify-between">
                        <label className="text-sm">Fecha de Siniestro</label>
                        <input 
                            type="text"
                            className="h-6 border border-gray-500 rounded" 
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
                        <span className="text-red-500 text-xs">{errors.fechaSiniestro.message}</span>
                    )}
                </div>
                <div className="mb-6 h-12 w-2/3">
                    <div className="flex justify-between">
                        <label className="text-sm">Lugar del Siniestro</label>
                        <input 
                            type="text"
                            className="h-6 border border-gray-500 rounded"
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
                        <span className="text-red-500 text-xs">{errors.lugarSiniestro.message}</span>
                    )}
                </div>
                <div className="mb-6 h-12 w-2/3">
                    <div className="flex justify-between">
                        <label className="text-sm">Ciudad de Ocurrencia</label>
                        <input 
                            type="text"
                            className="h-6 border border-gray-500 rounded"
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
                        <span className="text-red-500 text-xs">{errors.ciudadOcurrencia.message}</span>
                    )}
                </div>
                <div className="mb-6 h-12 w-2/3">
                    <div className="flex justify-between">
                        <label className="text-sm">Provincia de Ocurrencia</label>
                        <input 
                            type="text"
                            className="h-6 border border-gray-500 rounded"
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
                        <span className="text-red-500 text-xs">{errors.provinciaOcurrencia.message}</span>
                    )}
                </div>
                <div className="mb-6 h-12 w-2/3">
                    <div className="flex justify-between">
                        <label className="text-sm">Vehículo Asegurado</label>
                        <input 
                            type="text"
                            className="h-6 border border-gray-500 rounded"
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
                        <span className="text-red-500 text-xs">{errors.vehiculoAsegurado.message}</span>
                    )}
                </div>
                <div className="mb-6 h-12 w-2/3">
                    <div className="flex justify-between">
                        <label className="text-sm">Patente de Vehículo Asegurado</label>
                        <input 
                            type="text"
                            className="h-6 border border-gray-500 rounded"
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
                        <span className="text-red-500 text-xs">{errors.patenteVehiculoAsegurado.message}</span>
                    )}
                </div>
                <div className="mb-6 h-12 w-2/3">
                    <div className="flex justify-between">
                        <label className="text-sm">Conductor de Vehículo Asegurado</label>
                        <input 
                            type="text"
                            className="h-6 border border-gray-500 rounded"
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
                        <span className="text-red-500 text-xs">{errors.conductorVehiculoAsegurado.message}</span>
                    )}
                </div>
                <div className="mb-6 h-12 w-2/3">
                    <div className="flex justify-between">
                        <label className="text-sm">DNI de Conductor de Vehículo Asegurado</label>
                        <input 
                            type="text"
                            className="h-6 border border-gray-500 rounded"
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
                        <span className="text-red-500 text-xs">{errors.dniConductorAsegurado.message}</span>
                    )}
                </div>
                <div className="mb-6 h-12 w-2/3">
                    <div className="flex justify-between">
                        <label className="text-sm">Propietario de Vehículo Asegurado</label>
                        <input 
                            type="text"
                            className="h-6 border border-gray-500 rounded"
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
                        <span className="text-red-500 text-xs">{errors.propietarioAsegurado.message}</span>
                    )}
                </div>
                <div className="mb-6 h-12 w-2/3">
                    <div className="flex justify-between">
                        <label className="text-sm">Vehículo Tercero</label>
                        <input 
                            type="text"
                            className="h-6 border border-gray-500 rounded"
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
                        <span className="text-red-500 text-xs">{errors.vehiculoTercero.message}</span>
                    )}
                </div>
                <div className="mb-6 h-12 w-2/3">
                    <div className="flex justify-between">
                        <label className="text-sm">Patente de Vehículo Tercero</label>
                        <input 
                            type="text"
                            className="h-6 border border-gray-500 rounded"
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
                        <span className="text-red-500 text-xs">{errors.patente3ro.message}</span>
                    )}
                </div>
                <div className="mb-6 h-12 w-2/3">
                    <div className="flex justify-between">
                        <label className="text-sm">Conductor de Vehículo Tercero</label>
                        <input 
                            type="text"
                            className="h-6 border border-gray-500 rounded"
                            {...register("conductor3ro", {
                                maxLength: {
                                    value: 40,
                                    message: "Este campo no puede tener más de 40 caracteres",
                                },
                            })}
                        />
                    </div>
                    {errors.conductor3ro && typeof errors.conductor3ro.message === 'string' && (
                        <span className="text-red-500 text-xs">{errors.conductor3ro.message}</span>
                    )}
                </div>
                <div className="mb-6 h-12 w-2/3">
                    <div className="flex justify-between">
                        <label className="text-sm">Suma a Indemnizar</label>
                        <input 
                            type="number"
                            className="h-6 border border-gray-500 rounded"
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
                        <span className="text-red-500 text-xs">{errors.sumaIndemnizacion.message}</span>
                    )}
                </div>
                <div className="mb-6 h-12 w-2/3">
                    <div className="flex justify-between">
                        <label className="text-sm">Texto de Suma a Indemnizar</label>
                        <input 
                            type="text"
                            className="h-6 border border-gray-500 rounded"
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
                        <span className="text-red-500 text-xs">{errors.sumaIndemnizacionTexto.message}</span>
                    )}
                </div>
                <div className="mb-4">
                    {
                        isLoading ? (
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="rounded text-blue-500 p-2 bg-gray-300"
                            >
                                Generando Convenio...
                            </button>
                        ) : (
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="rounded text-white p-2 bg-blue-500 hover:bg-blue-700"
                            >
                                Generar Convenio
                            </button>
                        )
                    }
                </div>
            </form>
        </>
    )
}

export default ConvenioSimple;
