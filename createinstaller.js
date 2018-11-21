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
