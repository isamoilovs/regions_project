document.addEventListener('DOMContentLoaded', () => {
let button_create_input_table = document.getElementById('button-submit'),
    input_cols = document.getElementById('input-cols'),
    input_rows = document.getElementById('input-rows'),
    button_fun = document.getElementById('button-get-answer'),
    rows = Number(-1),
    cols = Number(-1),
    input_array = [];


function createTable(rows, cols) {
    if(((typeof(rows) != "number") || (typeof(cols) != "number")) 
                   || ((rows <= 0) || (cols <= 0))
                   || !((rows + cols) > 2)) {
        return null;
    } else {
        let true_probabylity = Number(0.8);
        input_array = [];
        let table = document.getElementById('table-input-matrix');
        for(let i = 0; i < rows; i++) {
            input_array.push(i);
            input_array[i] = [];
            let tr = document.createElement('tr');
            tr.id = "tr_input_" + String(i);
            tr.className = "tr_input";
            table.appendChild(tr);
            for(let j = 0; j < cols; j++) {
                let td = document.createElement('td');
                td.id = "td_input";
                td.className = "td_input";
                let input_button = document.createElement('button');
                input_button.id = "a[" + String(i) + "][" + String(j) + "]";
                input_button.className = 'input-button';
                td.appendChild(input_button);
                tr.appendChild(td);
                let value = Number(random_numberoboolean_value(true_probabylity));
                input_array[i].push(value);
                paint_button(i, j)
            }
        }
    }
}

function proceedClick_createTable() {

    if(rows != -1 && cols != -1) {
        for(let row = 0; row < rows; row++) {
            document.getElementById("tr_input_" + String(row)).remove();
        }
    }

    rows = Number(input_rows.value);
    cols = Number(input_cols.value);
    console.log(document.getElementById("table-input-matrix"));
    createTable(rows, cols);
    button_fun.removeAttribute('hidden');
    document.getElementById('proceed-container').removeAttribute('hidden');

}

function proceedClick_findRegions() {
    let result = String(findRegions(input_array));
    document.getElementById('label_to_answer').textContent = "Ответ: " + result;
    button_fun.removeAttribute("hidden");
    document.getElementById('label_to_answer').removeAttribute('hidden');
    document.getElementById('output-container').removeAttribute('hidden');
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

function find_sum_of_two_least_elems(arr) {
    if(!(Array.isArray(arr))) {
        return -1;
    } else {
        let min1 = Infinity;
        let min2 =  Infinity;
        for(let i = 0; i < arr.length; i++) {
            for(let j = 0; j < arr[0].length; j++){
                if((typeof(arr[i][j]) != 'number')
                    || (arr[i][j] == null)){
                        console.log(i, j);
                        return -3;
                } else if(typeof(arr[i][j]) == 'number') {
                    if((arr[i][j] < min1)&&(arr[i][j] >= 0)) {
                        min1 = min2;
                        min2 = arr[i][j];
                    } else if((arr[i][j] <= min2)&&(arr[i][j] >= 0)) {
                        min1 = arr[i][j];
                    }
                }
            }
        }
        return (min1 + min2);
    }
}

function button_change_value(i, j) {
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

button_create_input_table.addEventListener('click', proceedClick_createTable);

button_fun.addEventListener('click', proceedClick_findRegions);
})