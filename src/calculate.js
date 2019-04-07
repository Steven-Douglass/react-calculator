export const calculate = (lhs, rhs, operator) => {
    if (operator === "+") {
        if ( ( (parseFloat(lhs) + parseFloat(rhs)) % (parseInt(parseFloat(lhs) + parseFloat(rhs))) ) > 0.000001) {
            return (parseFloat(lhs) + parseFloat(rhs)).toFixed(5);
        } else if ((parseFloat(lhs) + parseFloat(rhs) > 0) && parseFloat(lhs) + parseFloat(rhs) < 1)
            return (parseFloat(lhs) + parseFloat(rhs)).toFixed(5);
        else
            return (parseFloat(lhs) + parseFloat(rhs)).toFixed(0);
    }
    else if (operator === "-") {
        return (parseFloat(lhs) - parseFloat(rhs)).toFixed(5);
    }
    else if (operator === "*") {
        return (parseFloat(lhs) * parseFloat(rhs)).toFixed(5);
    }
    else if (operator === "/") {
        if (rhs === '0') 
            return 'Error - division by 0';
        else
            return (parseFloat(lhs) / parseFloat(rhs)).toFixed(5);
    }
}