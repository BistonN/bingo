var saveHTMLEditItem = null;
const usedNums = []

const sendNum = () => {
    var newNum = Number(document.querySelector('.send input').value);
    if (!usedNums.includes(newNum) && newNum) {
        usedNums.push(newNum);
        var numList = updateNumList();
        numList.innerHTML = `
                <div class="row num-item" id="i${newNum}">
                    <div class="col">
                        <span>${newNum}</span>
                    </div>
                    <div class="col">
                        <button class="btn btn-secondary" onclick="editNum('i${newNum}')">Editar</button>
                        <button class="btn btn-danger" onclick="deleteNum('i${newNum}')">Apagar</button>
                    </div>
                </div>` + numList.innerHTML;
    } else {
        alert('Numero já adicionado ou valor inválido');
    }
}

const updateNumList = () => {
    return document.querySelector('.nums');
}

const deleteNum = (valueId) => {
    usedNums.splice(usedNums.indexOf(Number(valueId)));
    document.querySelector(`#${valueId}`).remove();
}

const editNum = (valueId) => {
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
            <button class="btn btn-secondary" onclick="saveEdit('${numValue}')">Salvar</button>
            <button class="btn btn-danger" onclick="cancelEdit('i${numValue}')">Cancelar</button>
        </div>
    `;
}

const cancelEdit = (valueId) => {
    document.querySelector(`#${valueId}`).innerHTML = saveHTMLEditItem;
}

const saveEdit = (oldValue) => {
    const newNumValue = document.querySelector('#edit').value;
    if (!usedNums.includes(Number(newNumValue))) {
        usedNums[usedNums.indexOf(Number(oldValue))] = Number(newNumValue);
        const newElement = document.querySelector(`#i${oldValue}`);
        newElement.innerHTML = saveHTMLEditItem.replaceAll(oldValue, newNumValue);
    } else {
        alert('Numero já existente!');
    }

}