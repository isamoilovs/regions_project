document.addEventListener('DOMContentLoaded', () => {
let buttonCreateInputMatrix = document.getElementById('create_matrix'),
    input_cols = document.getElementById('input_cols'),
    input_rows = document.getElementById('input_rows'),
    buttonFun = document.getElementById('proceed_matrix'),
    visualInputBox = document.getElementById('visual_input_data_matrix'),
    rows = Number(-1),
    cols = Number(-1),
    input_array = [];


function createTable(rows, cols) {
    if(((typeof(rows) != "number") || (typeof(cols) != "number")) 
                   || ((rows <= 0) || (cols <= 0))
                   || !((rows + cols) >= 4)) {
        input_cols.value = "";
        input_rows.value = "";
        alert("Required: cols+rows >= 4 !");
        return;
    } else {
        let true_probabylity = Number(0.7);
        input_array = [];
        for(let i = 0; i < rows; i++) {
            input_array.push(i);
            input_array[i] = [];
            let row_container = document.createElement('div');
            row_container.id = "row_container_" + String(i);
            row_container.className = "row_container container";
            visualInputBox.appendChild(row_container);
            for(let j = 0; j < cols; j++) {
                let cell = document.createElement('div');
                cell.id = "a[" + String(i) + "][" + String(j) + "]";
                cell.className = "input_cell";
                row_container.appendChild(cell);
                let value = Number(random_numberoboolean_value(true_probabylity));
                input_array[i].push(value);
                paint_button(i, j);
            }
        }
        console.log(input_array);
    }
}

function proceedClick_createTable() {
    if((rows != -1 && cols != -1)||(!(rows+cols < 4))) {
        for(let row = 0; row < rows; row++) {
            document.getElementById("row_container_" + String(row)).remove();
        }
    }
    rows = Number(input_rows.value);
    cols = Number(input_cols.value);
    createTable(rows, cols);
    if(!(rows+cols < 4)) {
        buttonFun.removeAttribute('hidden');
        document.getElementById('secondary_input_data_container').removeAttribute('hidden');
    }
}

function proceedClick_findRegions() {
    let result = String(findRegions(input_array));
    document.getElementById('label_to_answer').textContent = "Ответ: " + result;
    buttonFun.removeAttribute("hidden");
    document.getElementById('label_to_answer').removeAttribute('hidden');
    document.getElementById('output_wrapper').removeAttribute('hidden');
}
 
const random_numberoboolean_value = (true_probabylity) => {
    if (true_probabylity < 0 || true_probabylity > 1) {
        return -1;
    } else {
        if(Math.random() <= true_probabylity) {
            return 1;
        } else {
            return 0;
        };
    }
}

function paint_button(i, j) {
    if(typeof(i) != "number" || typeof(j) != "number") {
        alert("Wrong value of adress!");
        return;
    } else if((i < 0 || i > rows) || (j < 0 || j > cols)) {
        alert("There is no button with this adress!");
        return;
    } else {
        let id_to_find = "a[" + String(i) + "][" + String(j) + "]";
        let button = document.getElementById(id_to_find);
        if(input_array[i][j] == 1) {
            button.style.backgroundColor = "black";
        } else {
            button.style.backgroundColor = "white";
        }
        return;
    }
}

function buttonChangeValue(i, j) {
    if(typeof(i) != "number" || typeof(j) != "number") {
        alert("Wrong value of adress!");
        return;
    } else if((i < 0 || i > rows) || (j < 0 || j > cols)) {
        alert("There is no button with this adress!");
        return;
    } else if (input_array[i][j] == 1) {
        input_array[i][j] = Number(0);
        paint_button(i, j, Number(input_array[i][j]));
        return;
    } else if (input_array[i][j] == 0) {
        console.log(1);
        input_array[i][j] = Number(1);
        paint_button(i, j, Number(input_array[i][j]));
        return
    } else {
        alert('Unknown error!');
        return;
    }
}

function findRegions() {
    return String("[Here should be the result!]");
}

buttonCreateInputMatrix.addEventListener('click', proceedClick_createTable);

buttonFun.addEventListener('click', proceedClick_findRegions);
})