const calcButton = document.getElementById('calculate'),
      expInput = document.getElementById('expres'),
      result = document.getElementById('result');

calcButton.addEventListener('click', () => {
    const data = expInput.value;

    if (data.match(/( [\+\-\/\*] \d+)*$/)) {
        result.innerHTML = calculate(parseDataUser(data));
    } else {
        result.innerHTML = "Проверьте вводные данные!!!"
    }
    
});

// разбираем строку на массив чисел и операторов
function parseDataUser(dataStr) {
    let calculation = [],
        current = '';

    for (let i = 0; retChar = dataStr.charAt(i); i++) {
        if ('*/+-'.indexOf(retChar) > -1) {
            if (current == '' && retChar == '-') {
                current = '-';
            } else {
                calculation.push(parseFloat(current), retChar);
                current = '';
            }
        } else {
            current += dataStr.charAt(i);
        }
    }

    if (current != '') {
        calculation.push(parseFloat(current));
    }
    console.log(calculation);
    return calculation;

}

function calculate(calc) {
    let ops = [{'*': (a, b) => a * b, '/': (a, b) => a / b},
               {'+': (a, b) => a + b, '-': (a, b) => a - b}],
        newCalc = [],
        currentOp;

    for (let i = 0; i < ops.length; i++) {
        for (let j = 0; j < calc.length; j++) {
            if (ops[i][calc[j]]) {
                currentOp = ops[i][calc[j]];
            } else if (currentOp) {
                newCalc[newCalc.length - 1] = currentOp(newCalc[newCalc.length - 1], calc[j]);
                currentOp = null;
            } else {
                newCalc.push(calc[j]);
            }
            console.log(newCalc);
        }
        calc = newCalc;
        newCalc = [];
    }
    if (calc.length > 1) {
        console.log('Error: Something went wrong!!!');
        return calc;
    } else {
        return calc[0];
    }
}