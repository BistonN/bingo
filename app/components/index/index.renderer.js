const fs = require('fs');

document.querySelector('body').innerHTML = 'Ola';

fs.watch(`${__dirname}/../../dist/teste.csv`, function (event, filename) {
    console.log('event is: ' + event, filename);
    if (event === 'change') {
        console.log('file changed');
    }
});