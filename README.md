# Documentacion

## Requerimientos

Instalar las siguientes librerias de forma global:

> npm i -g electron-packager
>
> npm i -g electron-rebuild
>

Otros requesitos:

> Instalar Python v2.7.15 (Para rebuild de sqlite3)
>
> npm install -g windows-build-tools --vs2015 (En caso si no tienes instalado Visual Studio 2015) [Más Info](https://www.npmjs.com/package/windows-build-tools)

## SQLite de forma local

Para poder utilizar sqlite de forma local, despues de ejecutar **npm i** se debe ejecutar **npm run rebuild**

> PD: electron-rebuild funciona con versiones antiguas de electron

## Crear Instalador

Para crear el instalador son necesarios los siguientes recursos en la carpeta **installer**:

> favicon.ico
>
> loading.gif **tamaño maximo 256x256**

Para crear el **packager** del proyecto se debe ejecutar **npm run package-win** este comando es solo para windows, este comado ejecuta el archivo **build.js**

```js
const packager = require('electron-packager');
const rebuild = require('electron-rebuild');

packager({
    dir: './', //Directorio del proyecto en donde esta el *package.json*
    overwrite: true,
    asar: true,
    platform: 'win32', //La plataforma del sistema linux, win32, darwin, mas, all
    arch: 'ia32', //ia32, x64, armv7l, arm64 (Electron 1.8.0 and above), mips64el (Electron 1.8.2-beta.5 and above), all
    icon: './installer/favicon.ico', //icono del instalador
    prune: true,
    out: './release', //Carpeta en donde se va crear los archivos de para la instalacion
    executableName: 'sqlite-electron', //Nombre del .exe
    afterCopy: [(buildPath, electronVersion, platform, arch, callback) => {
      rebuild.rebuild({ buildPath, electronVersion, arch}).then(() =>{
        console.log('Success');
        callback()
      }).catch((error) =>{ 
        console.log('Aqui:', error)
        callback(error) 
      });
  }],
})
```

Luego que se ejecute correctamente se debe crear el setup, para esto se debe ejecutar:

> node createinstaller.js

se ejecutara el archivo **createinstaller.js**

```js
var electronInstaller = require('electron-winstaller');

var settings = {
    appDirectory: './release/sqlite-electron-win32-ia32/', //(dependera de donde se creo el packager en el paso anterior)
    outputDirectory: './release/built-installers/', //Va crear el directorio espefificado y en donde se creara el setup
    authors: 'Manuel Caroca Inc.',
    exe: './sqlite-electron.exe', //Nombre de tu proyecto o el archivo **.exe** que es en la carpeta 
    setupIcon: './installer/favicon.ico', // Icono del setup
    loadingGif: './installer/loading.gif'     // Gif loader mientra se instala la app
};

resultPromise = electronInstaller.createWindowsInstaller(settings);
 
resultPromise.then(() => {
    console.log("Los instaladores de su aplicación fueron creados exitosamente.!");
}, (e) => {
    console.log(`Bueno, a veces no eres tan afortunado: ${e.message}`)
});
```

# Extra

Notificaciones:

> La notoficaciones de electron no funciona de forma de desarrollo en Windows 10 para realizar la prueba de la notificaciones se debe crear el setup e instalar solo de esa forma sirve las notificaciones.