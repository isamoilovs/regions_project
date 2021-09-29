"use strict";

const header_lab = document.createElement('h1');
header_lab.id = "header-lab";
header_lab.className = "header-lab";
header_lab.textContent = "Курсовой проект";

const header_variant = document.createElement('h1');
header_variant.id = "header-variant";
header_variant.className = "header-variant";
header_variant.textContent = 'Вариант №2';

const header_task = document.createElement('h1');
header_task.id = "header-task";
header_task.className = "header-task";
header_task.textContent = "Задание:";

const header_decision = document.createElement('h1');
header_decision.id = 'header-decision';
header_decision.className = 'header-decision';
header_decision.textContent = "Решение:";

const header_input = document.createElement('h1');
header_input.id = 'header-input';
header_input.className = 'header-input';
header_input.textContent

const div_task = document.createElement('div');
div_task.id = "div-main";
div_task.className = "div-main";

const form_task = document.createElement('form');
form_task.id = "form-task";
form_task.className = "form-task";

const div_form_inner = document.createElement('div');
div_form_inner.id = "form-inner";
div_form_inner.className = "form-inner";

const task_inner = document.createElement('div');
task_inner.id = "task-inner";
task_inner.className = "task-inner";

const label_to_ask = document.createElement('p');
label_to_ask.id = "task-text";
label_to_ask.className = "task-text";
label_to_ask.innerHTML = `<u><b>Разработка скрипта «Количество обособленных регионов».</b></u>

<br>
<br>Область задана <b>прямоугольной матрицей</b>, состоящей из <b>нулей и единиц</b>. 
<br>
<br><i><b>Подсчитайте количество разных регионов</i></b><sup> (*), (**) </sup> <i><b>и верните результат.</b> </i>
<br>
<br>
<br>*Отдельный регион - это совокупность единиц, связанных между собой по горизонтали и вертикали.
<br>**В регионе могут быть пустые пространства.`;

const input_cols = document.createElement('input');
input_cols.type = "number";
input_cols.placeholder = 'Cols...';
input_cols.id = "input-cols";
input_cols.className = "input-cols";
input_cols.step = "1";
input_cols.min = "2";

const input_rows = document.createElement('input');
input_rows.type = "number";
input_rows.placeholder = "Rows...";
input_rows.id = "input-rows";
input_rows.className = "input-rows";
input_rows.step = "1";
input_rows.min = "2";


const button_submit = document.createElement('button');
button_submit.type = 'button';
button_submit.textContent = "Get input array";
button_submit.id = 'button-submit';
button_submit.className = 'button-submit';

const label_to_answer = document.createElement('label');
label_to_answer.hidden = true;
label_to_answer.id = 'label_to_answer';
label_to_answer.className = 'label_to_answer';

const input_box = document.createElement('div');
input_box.id = 'input-box';
input_box.className = 'input-box';

const form_task_container = document.createElement('div');
form_task_container.id = 'form-task-container';
form_task_container.className = 'form-task-container';

const output_container = document.createElement('div');
output_container.id = 'output-container';
output_container.className = 'output-container';
output_container.hidden = "true";

const input_matrix_data_inner = document.createElement('div');
input_matrix_data_inner.appendChild(input_rows);
input_matrix_data_inner.appendChild(input_cols);
input_matrix_data_inner.appendChild(button_submit);
input_matrix_data_inner.id = "input-inner";
input_matrix_data_inner.className = "input-inner";

const table_input_matrix = document.createElement('table');
table_input_matrix.id = 'table-input-matrix';
table_input_matrix.className = 'table-input-matrix';

const button_fun = document.createElement('button');
button_fun.id = 'button-get-answer';
button_fun.className = 'button-submit';
button_fun.textContent = "Get answer";
button_fun.hidden = 'true';

const proceed_container = document.createElement('div');
proceed_container.id = 'proceed-container';
proceed_container.className = 'proceed-container';
proceed_container.hidden = "true";

const table_box = document.createElement('div');
table_box.className = "table-box";
table_box.id = "table-box";

task_inner.appendChild(header_lab);
task_inner.appendChild(header_variant);
task_inner.appendChild(header_task);
task_inner.appendChild(label_to_ask);

const div_decision_box = document.createElement('div');
div_decision_box.id = "div-decision-box";
div_decision_box.className = "div-decision-box";

const div_input_data_wrapper = document.createElement('div');
div_input_data_wrapper.id = 'div-input-data-wrapper';
div_input_data_wrapper.className = 'div-input-data-wrapper';

output_container.appendChild(label_to_answer);
form_task_container.appendChild(form_task);
table_box.appendChild(table_input_matrix);
proceed_container.appendChild(table_box);
proceed_container.appendChild(button_fun);
    div_form_inner.appendChild(input_matrix_data_inner);
form_task.appendChild(div_form_inner);
div_decision_box.appendChild(header_decision);
div_input_data_wrapper.appendChild(form_task_container);
div_input_data_wrapper.appendChild(proceed_container);
    input_box.appendChild(div_decision_box);
    input_box.appendChild(div_input_data_wrapper);
    div_task.appendChild(task_inner);
    div_task.appendChild(input_box);
    div_task.appendChild(output_container);
document.body.appendChild(div_task);