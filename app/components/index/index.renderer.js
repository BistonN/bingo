const fs = require('fs');

// exports.setStateData = (dataList) => {
// }

fs.watch(`${__dirname}/../../dist/data.json`, function (event, filename) {
    console.log('event is: ' + event, filename);
    if (event === 'change') {
        fs.readFile(`${__dirname}/../../dist/data.json`, (err, data) => {
            if (err) throw err;
            let jsonData = JSON.parse(data);

            // func
            var dataList = jsonData['data'].reverse();
            console.log(dataList);
            var currentBall = dataList[0];
            dataList.shift();

            var mainBall = document.querySelector('.main-ball');
            mainBall.innerHTML = `
                <div id="boll1">
                    <p id="num1">${currentBall}</p>
                </div>
            `;

            var balls = document.querySelector('.balls');
            balls.innerHTML = '';
            for (var ballValue of dataList) {
                balls.innerHTML = balls.innerHTML + `
                    <div class="col-1">
                        <div class="boll">${ballValue}</div>
                    </div>
                `;
            }
        });
    }
});

