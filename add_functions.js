"use strict";

document.addEventListener('DOMContentLoaded', () => {
    let buttonProceedInputData = document.getElementById('create_matrix'),
        inputNumber = document.getElementById('input_number'),
        labelToAnswer = document.getElementById('label_to_answer'), 
        output_wrapper = document.getElementById('output_wrapper');

    function findAverageValueOfDigitsSum(number) {
        number = Math.abs(number);
        if(number === 0) {
            return 0;
        } else if(!isNaN(number)) {
            let sum = Number(0);
            let digitCounter = Number(0);
            let digit = Number(0);
            while(number > 0) {
                while(Math.abs(number - Math.round(number)) != 0) {
                    number *= 10;
                }
                number = Math.trunc(number);
                digit = number % 10;
                sum += digit;
                number = (number - digit) / 10;
                digitCounter++;
            }
            return (sum / digitCounter);
        } else {
            return -1;
        }
    }

    function proceedClick_proceedInputData() {
        let res = findAverageValueOfDigitsSum(parseFloat(inputNumber.value));
        console.log(res);
        output_wrapper.removeAttribute('hidden');
        labelToAnswer.removeAttribute('hidden');
        labelToAnswer.textContent = "Ответ: " + String(res);
    }

    buttonProceedInputData.addEventListener('click', proceedClick_proceedInputData);
})