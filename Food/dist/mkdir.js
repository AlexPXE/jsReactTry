const fs = require('fs');
const path = require('path');

const dirs = [
    'css',
    'icons',
    'img',
    'js',
    'sass',
];

dirs.forEach((val) => {
    fs.mkdir(path.join(__dirname, val), err => {
        if(err){
            console.log('dir already exists');
            //throw new Error(err);
        } else {
            console.log(`Создана папка ${val}`);
        }      
        
    });
});