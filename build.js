const packager = require('electron-packager');
const rebuild = require('electron-rebuild');

packager({
    dir: './',
    overwrite: true,
    asar: true,
    platform: 'win32',
    arch: 'ia32',
    icon: './installer/favicon.ico',
    prune: true,
    out: './release',
    executableName: 'sqlite-electron',
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