export const calculate = (lhs, rhs, operator) => {
    // Error checking
    if (lhs === 'Error - division by 0') 
        return 'Error - division by 0';

    // Total will hold the final value of the calculation
    var total = 0;

    // Calculate total based on operator
    if (operator === '+') 
        total = parseFloat(lhs) + parseFloat(rhs);
    else if (operator === '-')
        total = parseFloat(lhs) - parseFloat(rhs);
    else if (operator === '*')
        total = parseFloat(lhs) * parseFloat(rhs);
    else if (operator === '/') {
        if (rhs === '0') 
            return 'Error - division by 0';
        else
            total = parseFloat(lhs) / parseFloat(rhs);
    }

    // Check number for decimal point and fix the length of the decimal
    var decimal = total - parseInt(total);
    if (decimal > 0) {
        if (decimal.toFixed(5) - decimal.toFixed(1) === 0) 
            total = total.toFixed(1);
        else if (decimal.toFixed(5) - decimal.toFixed(2) === 0) 
            total = total.toFixed(2);
        else if (decimal.toFixed(5) - decimal.toFixed(3) === 0) 
            total = total.toFixed(3);
        else if (decimal.toFixed(5) - decimal.toFixed(4) === 0)
            total = total.toFixed(4);
        else if (decimal.toFixed(5) - decimal.toFixed(5) === 0)
            total = total.toFixed(5);
    }

    return total;
}