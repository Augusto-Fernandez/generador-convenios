Intento de clon de Taringa! hecho con [Electron](https://www.electronjs.org/)

## Requisitos Previos

Disponer de Node.js

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/Augusto-Fernandez/generador-convenios
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```


## Configuración

Crear archivo .env con el siguiente formato:

- AUTHOR="Autor de aplicación"
- CIUDAD="Ciudad donde se realiza el convenio"
- PROVINCIA="Provincia donde se realiza el convenio"
- ABOGADO="Nombre de abogado de la Compañía donde se realiza el convenio"
- COMPANIA="Nombre de la Compañía"
- DIRECCION_COMPANIA="Domicilio de la compañía, Ciudad, Provincia"
- BANCO="Nombre de banco que realiza pago en efectivo"

Se creó el archivo .example.env como ejemplo.

Crear carpeta /public dentro de /src y agregar logo de la compañía en formato png:
    
```
    src
    └── app
        └── public
            └── logo.png
```

## Script

Ejecutar este script para utilizar la aplicación

```bash
npm start
```

Ejecutar este script para correr el servidor de desarrollo

```bash
npm run dev
```

Crea la apliacición

```bash
npm run make
```

Ejecutar este script para realizar build del frontend

```bash
npm run build
```

Ejecutar este script para ver el frontend en el puerto 5173

```bash
npm run ui
```

Estos script son generados por Electro Forge

```bash
npm run start:forge
```
```bash
npm run package
```
