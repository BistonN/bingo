const fs = require('fs');

exports.pushData = () => {
    var json = JSON.stringify({
        "data": usedNums
    });
    fs.writeFile(`${__dirname}/../../dist/data.json`, json, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('O arquivo foi atualizado com sucesso!');
    });
}

var saveHTMLEditItem = null;
const usedNums = []

exports.sendNum = () => {
    var newNum = Number(document.querySelector('.send input').value);
    if (!usedNums.includes(newNum) && newNum) {
        usedNums.push(newNum);
        var numList = this.updateNumList();
        this.pushData();
        numList.innerHTML = `
                <div class="row num-item" id="i${newNum}">
                    <div class="col">
                        <span>${newNum}</span>
                    </div>
                    <div class="col">
                        <button class="btn btn-secondary" onclick="renderer.editNum('i${newNum}')">Editar</button>
                        <button class="btn btn-danger" onclick="renderer.deleteNum('i${newNum}')">Apagar</button>
                    </div>
                </div>` + numList.innerHTML;
    } else {
        console.log('Numero já adicionado ou valor inválido');
    }
}

exports.updateNumList = () => {
    return document.querySelector('.nums');
}

exports.deleteNum = (valueId) => {
    usedNums.splice(usedNums.indexOf(Number(valueId)));
    document.querySelector(`#${valueId}`).remove();
    this.pushData();
}

exports.editNum = (valueId) => {
    const currentEditItem = document.querySelector(`#${valueId}`);
    saveHTMLEditItem = currentEditItem.innerHTML;
    const numValue = currentEditItem.querySelector('span').innerText;

    currentEditItem.innerHTML = `
        <div class="col">
            <div class="form-group">
                <input class="form-control" type="text" id="edit" value="${numValue}">
            </div>
        </div>
        <div class="col">
            <button class="btn btn-secondary" onclick="renderer.saveEdit('${numValue}')">Salvar</button>
            <button class="btn btn-danger" onclick="renderer.cancelEdit('i${numValue}')">Cancelar</button>
        </div>
    `;
}

exports.cancelEdit = (valueId) => {
    document.querySelector(`#${valueId}`).innerHTML = saveHTMLEditItem;
}


// (TODO): quando o numero é editado, não é possível apagalo posteriormente
exports.saveEdit = (oldValue) => {
    const newNumValue = document.querySelector('#edit').value;
    if (!usedNums.includes(Number(newNumValue))) {
        usedNums[usedNums.indexOf(Number(oldValue))] = Number(newNumValue);
        const newElement = document.querySelector(`#i${oldValue}`);
        newElement.innerHTML = saveHTMLEditItem.replaceAll(oldValue, newNumValue);
        this.pushData();
    } else {
        console.log('Numero já existente!');
    }
}
