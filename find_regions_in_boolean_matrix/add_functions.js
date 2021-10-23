document.addEventListener('DOMContentLoaded', () => {
let buttonCreateInputMatrix = document.getElementById('create_matrix'),
    input_cols = document.getElementById('input_cols'),
    input_rows = document.getElementById('input_rows'),
    buttonFun = document.getElementById('proceed_matrix'),
    visualInputBox = document.getElementById('visual_input_data_matrix'),
    rows = Number(-1),
    cols = Number(-1),
    inputArray = [];


class ResultOfRegionsSearch {
        constructor() {
            this.regionsAmount = new Number(-1);
            this.regions = []
        }

        appendRegion() {
            this.regionsAmount++;
            this.regions.push(new Array());
        }

        //добавить обработку аргумента
        addCellToCurrentRegion(i, j) {
            let cell = new Array();
            cell.push(i);
            cell.push(j);
            this.regions[this.regionsAmount].push(cell);
        }

        getRegionsAmount() {
            return this.regionsAmount;
        }

        toString() {
            let answer = String(`Amount of regions: ${this.regionsAmount + 1}`);
            for(let i = 0; i < this.regions.length; i++) {
                answer += `
                Region ${i + 1}: `;
                for(let j = 0; j < this.regions[i].length; j++) {
                answer += `[${this.regions[i][j]}] `;
                }
            }
            return answer;
        }

        repaintLastRegion() {
            let color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
            console.log(this);
            for(let i = 0; i < this.regions[this.regionsAmount].length; i++) {
                let elem = document.getElementById("a[" + String(this.regions[this.regionsAmount][i][0]) + "][" + String(this.regions[this.regionsAmount][i][1]) + "]")
                if( elem != null) {
                    elem.style.backgroundColor = color;
                }
            }
        }
}

//createTable(rows, cols):
//creates table of DIVs
//based on data from inputs (cols and rows amount)
//and fills the main array inputArray with values (0 or 1)
//with a specific probabylity and method
function createTable(rows, cols) {
    if(((typeof(rows) != "number") || (typeof(cols) != "number")) 
                   || ((rows <= 0) || (cols <= 0))
                   || !((rows + cols) >= 4)) {
        input_cols.value = "";
        input_rows.value = "";
        alert("Required: cols+rows >= 4 !");
        return;
    } else {
        let true_probabylity = Number(0.4);
        inputArray = [];
        for(let i = 0; i < rows; i++) {
            inputArray[i] = [];
            let row_container = document.createElement('div');
            row_container.id = "row_container_" + String(i);
            row_container.className = "row_container container";
            visualInputBox.appendChild(row_container);
            for(let j = 0; j < cols; j++) {
                let cell = document.createElement('div');
                cell.id = "a[" + String(i) + "][" + String(j) + "]";
                cell.className = "input_cell";
                cell.addEventListener('click', 
                () => {
                    //repaints DIV which corresponds
                    //to value in inputArray[i][j]
                    //and changes it on opposite
                    if(typeof(i) != "number" || typeof(j) != "number") {
                        alert("Wrong value of adress!");
                        return;
                    } else if((i < 0 || i > rows) || (j < 0 || j > cols)) {
                        alert("There is no button with this adress!");
                        return;
                    } else if (inputArray[i][j] == 1) {
                        inputArray[i][j] = Number(0);
                        paintButton(i, j, Number(inputArray[i][j]));
                        console.log(inputArray[i][j]);
                        return;
                    } else if (inputArray[i][j] == 0) {
                        inputArray[i][j] = Number(1);
                        paintButton(i, j, Number(inputArray[i][j]));
                        console.log(inputArray[i][j]);
                        return;
                    } else {
                        alert('Unknown error!');
                        return;
                    }
                });
                row_container.appendChild(cell);
                let value = Number(getRandomDigitalBooleanValue(true_probabylity));
                inputArray[i].push(value);
                paintButton(i, j);
            }
        }
        console.log(inputArray);
    }
}
 
//getRandomDigitalBooleanValue(true_probabylity):
//returns value (number, 0 or 1),
//generated with a defined probabylyty
//of Number(1) raising
const getRandomDigitalBooleanValue = (true_probabylity) => {
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

//paintButton(i, j):
//sets the colour of DIV
//from DIV table depending of
//inputArray[i][j] value
//white - 0
//black - 1
function paintButton(i, j) {
    if(typeof(i) != "number" || typeof(j) != "number") {
        alert("Wrong value of adress!");
        return;
    } else if((i < 0 || i > rows) || (j < 0 || j > cols)) {
        alert("There is no button with this adress!");
        return;
    } else {
        let id_to_find = "a[" + String(i) + "][" + String(j) + "]";
        let button = document.getElementById(id_to_find);
        if(inputArray[i][j] == 1) {
            button.style.backgroundColor = "black";
        } else {
            button.style.backgroundColor = "white";
        }
        return;
    }
}

//compare two arrays
function arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

// findRegions(input_array)
// key function that:
// creates output object ResultOfRegionsSearch
function findRegions(inputArray) {
    let nextElem = getPositiveElement(inputArray),
        visitedArray = getVisitedArray(inputArray),
        neighbourCells = new Array(),
        stackCells = new Array(),
        resultOfRegionsSearch = new ResultOfRegionsSearch();
        while(!arrayEquals(nextElem, [-1, -1])) {
            visitedArray[nextElem[0]][nextElem[1]] = 0;
            neighbourCells = getNeighbours(visitedArray, nextElem[0], nextElem[1]);
            console.log(arrayEquals(neighbourCells, [-1, -1]));
            if(arrayEquals(neighbourCells, [-1, -1])) {
                if(stackCells.length == 0) {
                    if(resultOfRegionsSearch.getRegionsAmount() == -1) {
                        resultOfRegionsSearch.appendRegion();
                        resultOfRegionsSearch.addCellToCurrentRegion(nextElem[0], nextElem[1]);
                    } else {
                        resultOfRegionsSearch.addCellToCurrentRegion(nextElem[0], nextElem[1]);
                    }
                    nextElem = getPositiveElement(visitedArray);
                    resultOfRegionsSearch.repaintLastRegion();
                    resultOfRegionsSearch.appendRegion();
                } else {
                    if(resultOfRegionsSearch.getRegionsAmount() == -1) {
                        resultOfRegionsSearch.appendRegion();
                        resultOfRegionsSearch.addCellToCurrentRegion(nextElem[0], nextElem[1]);
                    } else {
                        resultOfRegionsSearch.addCellToCurrentRegion(nextElem[0], nextElem[1]);
                    }
                    nextElem = stackCells.pop();
                }
            } else {
                console.log(nextElem, neighbourCells);
                neighbourCells.forEach(cell => {
                    stackCells.push(cell);
                });
                if(resultOfRegionsSearch.getRegionsAmount() == -1) {
                    resultOfRegionsSearch.appendRegion();
                    resultOfRegionsSearch.addCellToCurrentRegion(nextElem[0], nextElem[1]);
                } else {
                    resultOfRegionsSearch.addCellToCurrentRegion(nextElem[0], nextElem[1]);
                }
                nextElem = stackCells.pop();
            }
        }
        console.log(resultOfRegionsSearch.toString());
}


//in fact returns the copy of inputArray
function getVisitedArray(inputArray) {
    let visitedArray = [];
    for(let rows = 0; rows < inputArray.length; rows++) {
        visitedArray[rows] = []
        for(let cols = 0; cols < inputArray[rows].length; cols++) {
            visitedArray[rows].push(inputArray[rows][cols]);
        }
    }
    return visitedArray;
}


//returns from Array(1..4) with neighbour elements of inputArray[i][j] element
//returns [-1, -1] if there are no neighbours
function getNeighbours(inputArray, i, j) {
    let res = new Array();
    
    if(inputArray[i].length > j + 1) {
        if(inputArray[i][j + 1] == 1) {
            res.push([i, j + 1]);
        }
    } if(inputArray[i].length > i + 1) {
        if(inputArray[i + 1][j] == 1) {
            res.push([i + 1, j]);
        }
    } if(i - 1 >= 0) {
        if(inputArray[i - 1][j] == 1) {
            res.push([i - 1, j]);
        }
    } if(j - 1 >= 0) {
        if(inputArray[i][j - 1] == 1) {
            res.push([i, j - 1]);
        } 
    }

    if(res.length == 0) {
        return [-1, -1];
    } else {
        return res;
    }
}
 
//returns indexes of first positive array's elem if it is [i, j], [-1; -1] otherwise
function getPositiveElement(inputArray) {
    for(let i = 0; i < inputArray.length; i++) {
        for(let j = 0; j < inputArray[i].length; j++) {
            if(inputArray[i][j] > 0) {
                return [i, j];
            }
        }
    }
    return [-1, -1];
}

//proceedClick_createTable():
//proceeds click on button which should
//start runing createTable after checking input arguements
function proceedClick_createTable() {
    rows = Number(input_rows.value);
    cols = Number(input_cols.value);
    if((rows != -1 && cols != -1)) {
        let row = Number(0);
        while(document.getElementById("row_container_" + String(row)) != null) {
            document.getElementById("row_container_" + String(row)).remove();
            row++;
        }
    }

    createTable(rows, cols);

    if(!(rows+cols < 4)) {
        buttonFun.removeAttribute('hidden');
        document.getElementById('secondary_input_data_container').removeAttribute('hidden');
    }
}

//proceedClick_findRegions():
//proceeds click on button which should
//start runing main function findRegions()
//after checking arguements
function proceedClick_findRegions() {
    let result = String(findRegions(inputArray));
    document.getElementById('label_to_answer').textContent = "Ответ: " + result;
    buttonFun.removeAttribute("hidden");
    document.getElementById('label_to_answer').removeAttribute('hidden');
    document.getElementById('output_wrapper').removeAttribute('hidden');
}

//adding event listeners on created buttons
buttonCreateInputMatrix.addEventListener('click', proceedClick_createTable);
buttonFun.addEventListener('click', proceedClick_findRegions);
})