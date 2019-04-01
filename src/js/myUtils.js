export function formatNumber(n) {

    return n.replace(/[^0-9,-]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


export function formatCurrency(input, blur) {
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.

    // get input value
    var input_val = input.val();

    // don't validate empty input
    if (input_val === "") {
        return;
    }

    // original length
    var original_len = input_val.length;

    // initial caret position 
    var caret_pos = input.prop("selectionStart");

    // check for decimal
    if (input_val.indexOf(".") >= 0) {

        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimal_pos = input_val.indexOf(".");

        // split number by decimal point
        var left_side = input_val.substring(0, decimal_pos);
        var right_side = input_val.substring(decimal_pos);

        // add commas to left side of number
        left_side = formatNumber(left_side);

        // validate right side
        right_side = formatNumber(right_side);

        // On blur make sure 2 numbers after decimal
        if (blur === "blur") {
            right_side += "00";
        }

        // Limit decimal to only 2 digits
        right_side = right_side.substring(0, 2);

        // join number by .
        input_val = left_side + "." + right_side;

    } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        input_val = formatNumber(input_val);

        // final formatting
        if (blur === "blur") {
            input_val += ".00";
        }
    }

    // send updated string to input
    input.val(input_val);

    // put caret back in the right position
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);
}

export function splitString(stringToSplit, separator) {
    var idxFirst = stringToSplit.indexOf(separator);

    var sublable = stringToSplit.substring(0, idxFirst).trim();
    var subvalue = stringToSplit.substring(idxFirst + 1).trim();
 
    if (parseFloat(subvalue) < 0) {
        return sublable += " : -$" + parseFloat(subvalue).toFixed(2).replace(/-/g, "").replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    } else if (subvalue > 0) {
        return sublable += " : $" + parseFloat(subvalue).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }
}

export function formatString(str) {

    if (parseFloat(str) < 0) {
        return "-$" + parseFloat(str).toFixed(2).replace(/-/g, "").replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    } else if (str > 0) {
        return "$" + parseFloat(str).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }
}

export function getValue(stringToSplit, separator) {
    var idxFirst = stringToSplit.indexOf(separator);
    var subvalue = stringToSplit.substring(idxFirst + 1).trim();

    return parseFloat(subvalue);
}

